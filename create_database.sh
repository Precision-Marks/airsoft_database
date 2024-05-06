#!/bin/bash
rm -rf ./temp_realm_data/* || exit 1
npm run create-database || exit 1
find ./temp_realm_data -maxdepth 1 -not -type p -not -type d -exec cp -v {} ./realm_data/ \; || exit 1

echo "Done. Copy ./realm_data/catalog_data.realm and ./realm_data/catalog_data.realm.commitid to airsoft_spotter/app/src/main/assets/"
