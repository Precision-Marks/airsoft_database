#!/bin/bash
mkdir -p ./temp_db/realm || exit 1
mkdir -p ./db/realm || exit 1
rm -rf ./temp_db/realm/* || exit 1
npm run create-database || exit 1
find ./temp_db/realm -maxdepth 1 -not -type p -not -type d -exec cp -v {} ./db/realm/ \; || exit 1

echo "Done. Copy ./db/realm/catalog_data.realm and ./db/realm/catalog_data.realm.commitid to airsoft_spotter/app/src/main/assets/"
