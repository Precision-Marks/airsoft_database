import path from "path";
import { program } from "commander";
import Realm from "realm";
import * as ParseCSV from "./parseCSV";
import { IManufacturerCatalog } from "./models/ManufacturerCatalog";
import { SCHEMA_VERSION } from "./models/RealmDataConst";
import { RealmManufacturerCatalog } from "./schemas/RealmManufacturerCatalog";
import { validateManufacturer } from "./validateManufacturer";
import { CsvError } from "csv-parse/sync";

export function createManufacturerCatalog(realm: Realm, filePath: string): boolean {
    let manufacturers: (IManufacturerCatalog | null)[] = [];

    try {
        manufacturers = ParseCSV.parseCsvFile(filePath, RealmManufacturerCatalog.schema);
        validateManufacturer(manufacturers);
    } catch (e) {
        if (e instanceof TypeError || e instanceof CsvError) {
            throw new Error(`${path.basename(filePath)}: ${e.message}`);
        } else {
            throw new Error(`${path.basename(filePath)}:  ${JSON.stringify(e)}`);
        }

        return false;
    }
    
    realm.write(() => {
        manufacturers.forEach((manufacturer, index) => {
            // Skip empty lines
            if (manufacturer === null) {
                return;
            }

            try {
                realm.create(RealmManufacturerCatalog, manufacturer);
            } catch (e) {
                throw new Error(`${path.basename(filePath)}: Exception at line ${index + 2}: ${JSON.stringify(e)}`);
            }
        });
    });

    return true;
}

async function main(argv: string[]): Promise<boolean> {
    const realm = await Realm.open({
        inMemory: true,
        schema: [RealmManufacturerCatalog],
        schemaVersion: SCHEMA_VERSION,
    });

    try {
        const status = createManufacturerCatalog(realm, argv[0]);
    } catch(e) {
        if (e instanceof Error) {
            console.error(e.message);
        } else {
            console.error(`Unknown error: ${JSON.stringify(e)}`)
        }
        return false
    }
    realm.close();

    return true;
}

if (require.main === module) {
    (async () => {
        console.log("Running createManufacturerCatalog");
        program
            .description('Unit test to creating manufacturer catalog from CSV file. Test only, no output.')
            .argument('[filePath]', 'path to CSV file', `${__dirname}/../source_data/ManufacturerCatalog.csv`)
            .action(async (filePath) => {
                console.log(`Creating manufacturer catalog from ${filePath}`)
                const success = await main([filePath]);
                console.log(`createManufacturerCatalog ${success ? "succeeded" : "failed"}`);
                process.exit(success ? 0 : 1);
            });

        program.parse(process.argv);
    })();
}