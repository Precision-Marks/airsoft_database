import path from "path";
import { program } from "commander";
import Realm from "realm";
import * as ParseCSV from "./parseCSV";
import { IGunCatalog } from "./models/GunCatalog";
import { SCHEMA_VERSION } from "./models/RealmDataConst";
import { RealmGunCatalog } from "./schemas/RealmGunCatalog";
import { validateGun } from "./validateGun";
import { CsvError } from "csv-parse/sync";
import { RealmManufacturerCatalog } from "./schemas/RealmManufacturerCatalog";

export function createGunCatalog(realm: Realm, filePath: string, checkManufacturer = false): boolean {
    let guns: (IGunCatalog | null)[] = [];

    try {
        let manufacturers: string[] | undefined;

        if (checkManufacturer) {
            // Get list of manufacturer ids
            manufacturers = realm.objects(RealmManufacturerCatalog).map(manufacturer => manufacturer._id);
            if (manufacturers.length == 0) {
                throw new Error(`Missing manufacturer data`);
            }
        }
        guns = ParseCSV.parseCsvFile(filePath, RealmGunCatalog.schema);
        validateGun(guns, manufacturers);
    } catch (e) {
        if (e instanceof TypeError || e instanceof CsvError) {
            throw new Error(`${path.basename(filePath)}: ${e.message}`);
        } else {
            throw new Error(`${path.basename(filePath)}:  ${JSON.stringify(e)}`);
        }

        return false;
    }

    realm.write(() => {
        guns.forEach((gun, index) => {
            // Skip empty lines
            if (gun === null) {
                return;
            }

            try {
                realm.create(RealmGunCatalog, gun);
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
        schema: [RealmGunCatalog],
        schemaVersion: SCHEMA_VERSION,
    });

    try {
        createGunCatalog(realm, argv[0]);
    } catch(e) {
        if (e instanceof Error) {
            console.log(e.message);
        } else {
            console.log(`Unknown error: ${JSON.stringify(e)}`)
        }
        return false
    } finally {
        realm.close();
    }

    return true;
}

if (require.main === module) {
    (async () => {
        console.log("Running createGunCatalog.ts");
        program
            .description('Unit test for creating gun catalog from CSV file. Test only, no output.')
            .argument('[filePath]', 'path to gun catalog csv file', `${__dirname}/../source_data/RealmGunCatalog.csv`)
            .action(async (filePath) => {
                console.log(`Creating gun catalog from ${filePath}`)
                const success = await main([filePath]);
                console.log(`createGunCatalog ${success ? "succeeded" : "failed"}`);
                process.exit(success ? 0 : 1);
            });

        program.parse(process.argv);
    })();
}