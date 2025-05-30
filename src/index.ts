import fs from "fs";
import path from "path";
// module to parse command line arguments
import yargs from "yargs";

import { OptionValues, program } from "commander";
import Realm from "realm";

import { SCHEMA_VERSION } from "./models/RealmDataConst";

import { RealmCatalogMetadata } from "./schemas/RealmCatalogMetadata";
import { RealmManufacturerCatalog } from "./schemas/RealmManufacturerCatalog";
import { RealmGunCatalog } from "./schemas/RealmGunCatalog";
import { RealmShootingRuleCatalog } from "./schemas/RealmShootingRuleCatalog";

import { createShootingRuleCatalog } from "./createShootingRuleCatalog";
import { createManufacturerCatalog } from "./createManufacturerCatalog";
import { createGunCatalog } from "./createGunCatalog";

const REALM_FILE_NAME = "catalog_data.realm";

function getVersionFilename(realmFile: string): string {
    return `${realmFile}.commitid`;
}

function writeVersionFile(realmFile: string, commitId: string): void {
    const versionFilename = getVersionFilename(realmFile);
    fs.writeFileSync(versionFilename, commitId);
}

async function main(options: OptionValues, directory: string): Promise<boolean> {
    let realm: Realm;

    try {
        realm = await (async () => {;
            const schema = [RealmCatalogMetadata, RealmManufacturerCatalog, RealmGunCatalog, RealmShootingRuleCatalog]
    
            if (options.test) {
                return await Realm.open({
                    inMemory: true,
                    schema: schema,
                    schemaVersion: SCHEMA_VERSION,
                });
            } else {
                if (fs.existsSync(options.output)) {
                    throw new Error(`ERROR: Output file ${options.output} already exists.`);
                }

                const versionFilename = getVersionFilename(options.output);
                if (fs.existsSync(versionFilename)) {
                    throw new Error(`ERROR: Version file ${versionFilename} already exists.`);
                }

                if (options.commit === "") {
                    throw new Error("ERROR: commit id is empty");
                }

                return await Realm.open({
                    path: options.output,
                    schema: schema,
                    schemaVersion: SCHEMA_VERSION,
                });
            }
        })();    
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
        } else {
            console.error(`Unknown error: ${JSON.stringify(e)}`)
        }
        return false
    }

    if (realm instanceof Realm) {
        try {
            let file: string;
            let success: boolean;

            if (options.test) {
                console.log("Testing input files only, no output");
            } else {
                console.log(`Creating realm file ${options.output}`);

                realm.write(() => {
                    realm.create(RealmCatalogMetadata.schema.name, {
                        _id: 0,
                        realmInstant: new Date(),
                        commitId: options.commit,
                    });
                });
            }

            file = `${directory}RealmManufacturerCatalog.csv`;
            console.log(`\nWriting manufacturer catalog from ${file}`)
            success = createManufacturerCatalog(realm, `${file}`);
            console.log(`${success ? "Done" : "FAILED"}`);

            file = `${directory}RealmGunCatalog.csv`;
            console.log(`\nWriting gun catalog from ${file}`)
            success = createGunCatalog(realm, `${file}`);
            console.log(`${success ? "Done" : "FAILED"}`);

            file = `${directory}RealmShootingRuleCatalog.csv`;
            console.log(`\nWriting shooting rule catalog from ${file}`)
            success = createShootingRuleCatalog(realm, `${file}`);
            console.log(`${success ? "Done" : "FAILED"}`);

            realm.close();

            if (!options.test) {
                writeVersionFile(options.output, options.commit);
            }
        } catch(e) {
            if (e instanceof Error) {
                console.error(e.message);
            } else {
                console.error(`Unknown error: ${JSON.stringify(e)}`)
            }
            realm.close();
            if (!options.test) {
                fs.unlinkSync(options.output); // delete output file
            }

            return false
        }

        return true
    }

    return false
}

(async () => {
    program
        .description('Create Airsoft Database from csv files')
        .option('-c, --commit <commit>', 'commit id', '')
        .option('-t, --test', 'test only, no output')
        .option('-o, --output <output>', 'output file name', path.normalize(`${__dirname}/../temp_realm_data/${REALM_FILE_NAME}`))
        .argument('[directory]', 'directory containing csv files', path.normalize(`${__dirname}/../source_data/`))
        .action(async (directory) => {
            const options = program.opts();
            const test = options.test;
            const success = await main(options, directory);
            console.log(`${success ? "\nSucceeded" : "\nFAILED"}`);
            process.exit(success ? 0 : 1);
        });

    program.parse(process.argv);
})();
