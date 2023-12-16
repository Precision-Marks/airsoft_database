import fs from "fs";
// module to parse command line arguments
import yargs from "yargs";

import Realm from "realm";
import { RealmManufacturerCatalog } from "./schemas/RealmManufacturerCatalog";
import { RealmGunCatalog } from "./schemas/RealmGunCatalog";
import { RealmShootingRuleCatalog } from "./schemas/RealmShootingRuleCatalog";

const REALM_FILE_NAME = "catalog_data.realm";

async function main() {
    const realm = await Realm.open({
        path: REALM_FILE_NAME,
        schema: [RealmManufacturerCatalog, RealmGunCatalog, RealmShootingRuleCatalog],
    });
    
}

(async () => {
    await main();
})();
