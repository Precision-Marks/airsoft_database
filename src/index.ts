import fs from "fs";
// module to parse command line arguments
import yargs from "yargs";

import { OptionValues, program } from "commander";
import Realm from "realm";

import { RealmManufacturerCatalog } from "./schemas/RealmManufacturerCatalog";
import { RealmGunCatalog } from "./schemas/RealmGunCatalog";
import { RealmShootingRuleCatalog } from "./schemas/RealmShootingRuleCatalog";

import { createShootingRuleCatalog } from "./createShootingRuleCatalog";
import { createManufacturerCatalog } from "./createManufacturerCatalog";
import { createGunCatalog } from "./createGunCatalog";

const REALM_FILE_NAME = "catalog_data.realm";

async function main(options: OptionValues, directory: string): Promise<boolean> {
    const realm = await (async () => {;
        const schema = [RealmManufacturerCatalog, RealmGunCatalog, RealmShootingRuleCatalog]

        if (options.test) {
            return await Realm.open({
                inMemory: true,
                schema: schema,
            });
        } else {
            if (fs.existsSync(options.output)) {
                console.log(`ERROR: Output file ${options.output} already exists.`);
                return false;
            }

            return await Realm.open({
                path: options.output,
                schema: schema,
            });
        }
    })();

    if (realm instanceof Realm) {
        try {
            let file: string;
            let success: boolean;

            if (options.test) {
                console.log("Testing input files only, no output");
            } else {
                console.log(`Creating realm file ${options.output}`);
            }

            file = `${directory}RealmManufacturerCatalog.csv`;
            console.log(`\nCreating manufacturer catalog from ${file}`)
            success = createManufacturerCatalog(realm, `${file}`);
            console.log(`${success ? "Succeeded" : "FAILED"}`);

            file = `${directory}RealmGunCatalog.csv`;
            console.log(`\nCreating gun catalog from ${file}`)
            success = createGunCatalog(realm, `${file}`);
            console.log(`${success ? "Succeeded" : "FAILED"}`);

            file = `${directory}RealmShootingRuleCatalog.csv`;
            console.log(`\nCreating shooting rule catalog from ${file}`)
            success = createShootingRuleCatalog(realm, `${file}`);
            console.log(`${success ? "Succeeded" : "FAILED"}`);

            realm.close();
        } catch(e) {
            if (e instanceof Error) {
                console.error(e.message);
            } else {
                console.error(`Unknown error: ${JSON.stringify(e)}`)
            }
            realm.close();
            fs.unlinkSync(options.output); // delete output file

            return false
        }

        return true
    }

    return false
}

(async () => {
    program
        .description('Create Airsoft Database from csv files')
        .option('-t, --test', 'test input files')
        .option('-o, --output <output>', 'output file name', `${__dirname}/${REALM_FILE_NAME}`)
        .argument('[directory]', 'directory containing csv files', `${__dirname}/../source_data/`)
        .action(async (directory) => {
            const options = program.opts();
            const test = options.test;
            const success = await main(options, directory);
            console.log(`${success ? "Succeeded" : "FAILED"}`);
            process.exit(success ? 0 : 1);
        });

    program.parse(process.argv);
})();
