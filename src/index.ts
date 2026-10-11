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
import { buildSqlite } from "./sqldelight";
import * as ParseCSV from "./parseCSV";
import { IGunCatalog } from "./models/GunCatalog";
import { checkGunIdImmutability, loadBaselineGuns } from "./validateGunIdImmutability";

const REALM_FILE_NAME = "catalog_data.realm";
const BASELINE_DB_FILE = path.normalize(`${__dirname}/../db/sqlite/catalog_data.db`);

function getVersionFilename(realmFile: string): string {
    return `${realmFile}.commitid`;
}

function writeVersionFile(realmFile: string, commitId: string): void {
    const versionFilename = getVersionFilename(realmFile);
    fs.writeFileSync(versionFilename, commitId);
}

/**
 * Check that gun ids in the baseline database are neither removed nor reassigned.
 * @returns true if no error is found (warnings are allowed)
 */
function checkGunIds(options: OptionValues, directory: string): boolean {
    if (options.baseline === false) {
        console.log("\nSkipping gun id immutability check");
        return true;
    }

    const baselineFile = options.baseline as string;
    console.log(`\nChecking gun id immutability against ${baselineFile}`);
    if (!fs.existsSync(baselineFile)) {
        console.error(`ERROR: Baseline database ${baselineFile} not found. Use --no-baseline to skip this check.`);
        return false;
    }

    const baseline = loadBaselineGuns(baselineFile);
    const guns = ParseCSV.parseCsvFile(`${directory}GunCatalog.csv`, RealmGunCatalog.schema) as (IGunCatalog | null)[];
    const result = checkGunIdImmutability(baseline, guns);

    result.warnings.forEach(warning => console.log(`Warning: ${warning}`));
    result.errors.forEach(error => console.error(`ERROR: ${error}`));

    const success = result.errors.length === 0;
    console.log(`${success ? "Done" : "FAILED"} (${baseline.length} gun ids checked, ${result.errors.length} errors, ${result.warnings.length} warnings)`);
    return success;
}

async function main(options: OptionValues, directory: string): Promise<boolean> {
    const format = (options.format ?? 'all') as string;
    // If sqlite only, skip Realm entirely
    if (!options.test && format === 'sqlite') {
        try {
            if (!checkGunIds(options, directory)) {
                return false;
            }
            const sqliteOk = await buildSqlite(options, directory);
            return sqliteOk;
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
            } else {
                console.error(`Unknown error: ${JSON.stringify(e)}`)
            }
            return false;
        }
    }

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

            file = `${directory}ManufacturerCatalog.csv`;
            console.log(`\nWriting manufacturer catalog from ${file}`)
            success = createManufacturerCatalog(realm, `${file}`);
            console.log(`${success ? "Done" : "FAILED"}`);

            file = `${directory}GunCatalog.csv`;
            console.log(`\nWriting gun catalog from ${file}`)
            success = createGunCatalog(realm, `${file}`);
            console.log(`${success ? "Done" : "FAILED"}`);

            file = `${directory}ShootingRuleCatalog.csv`;
            console.log(`\nWriting shooting rule catalog from ${file}`)
            success = createShootingRuleCatalog(realm, `${file}`);
            console.log(`${success ? "Done" : "FAILED"}`);

            if (!checkGunIds(options, directory)) {
                throw new Error("ERROR: Gun id immutability check failed");
            }

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

        // If format is all or sqlite, also build sqlite DB
        if (!options.test) {
            if (format === 'sqlite' || format === 'all') {
                const sqliteOk = await buildSqlite(options, directory);
                if (!sqliteOk) return false;
            }
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
        .option('-f, --format <format>', 'output format: realm | sqlite | all (default: all)', 'all')
        .option('-o, --output <output>', 'output file name', path.normalize(`${__dirname}/../temp_db/realm/${REALM_FILE_NAME}`))
        .option('-b, --baseline <baseline>', 'released SQLite database to check gun id immutability against', BASELINE_DB_FILE)
        .option('--no-baseline', 'skip gun id immutability check')
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
