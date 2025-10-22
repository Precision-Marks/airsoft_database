import path from "path";
import { program } from "commander";
import Realm from "realm";
import * as ParseCSV from "./parseCSV";
import { IShootingRuleCatalog } from "./models/ShootingRuleCatalog";
import { SCHEMA_VERSION } from "./models/RealmDataConst";
import { RealmShootingRuleCatalog } from "./schemas/RealmShootingRuleCatalog";
import { validateShootingRule } from "./validateShootingRule";
import { CsvError } from "csv-parse/sync";

export function createShootingRuleCatalog(realm: Realm, filePath: string): boolean {
    let shootingRules: (IShootingRuleCatalog | null)[] = [];

    try {
        shootingRules = ParseCSV.parseCsvFile(filePath, RealmShootingRuleCatalog.schema);
        validateShootingRule(shootingRules);
    } catch (e) {
        if (e instanceof TypeError || e instanceof CsvError) {
            throw new Error(`${path.basename(filePath)}: ${e.message}`);
        } else {
            throw new Error(`${path.basename(filePath)}:  ${JSON.stringify(e)}`);
        }

        return false;
    }

    realm.write(() => {
        shootingRules.forEach((shootingRule, index) => {
            // Skip empty lines
            if (shootingRule === null) {
                return;
            }

            try {
                realm.create(RealmShootingRuleCatalog, shootingRule);
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
        schema: [RealmShootingRuleCatalog],
        schemaVersion: SCHEMA_VERSION,
    });

    try {
        const status = createShootingRuleCatalog(realm, argv[0]);
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
        console.log("Running createShootingRuleCatalog.ts");
        program
            .description('Unit test for creating shooting rule catalog from CSV file. Test only, no output.')
            .argument('[filePath]', 'path to shooting rule catalog csv file', `${__dirname}/../source_data/ShootingRuleCatalog.csv`)
            .action(async (filePath) => {
                console.log(`Creating shooting rule catalog from ${filePath}`)
                const success = await main([filePath]);
                console.log(`createShootingRuleCatalog ${success ? "succeeded" : "failed"}`);
                process.exit(success ? 0 : 1);
            });

        program.parse(process.argv);
    })();
}