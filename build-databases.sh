#!/bin/bash

# Ensure running from repository root
if [ "$(git rev-parse --show-toplevel)" != "$PWD" ]; then
  echo "Error: Please run this script from the repository root" >&2
  echo "Current directory: $PWD" >&2
  echo "Repository root: $(git rev-parse --show-toplevel)" >&2
  exit 1
fi

mkdir -p ./temp_db/realm || exit 1
mkdir -p ./db/realm || exit 1
mkdir -p ./db/sqlite || exit 1
rm -rf ./temp_db/realm && mkdir -p ./temp_db/realm || exit 1
npm run create-database -- "$@" || exit 1
find ./temp_db/realm -maxdepth 1 -not -type p -not -type d -exec cp -v {} ./db/realm/ \; || exit 1

# Verify SQLite outputs (created by default via --format=all in src/index.ts)
if [ ! -f ./db/sqlite/catalog_data.db ]; then
  echo "ERROR: SQLite DB file not found: ./db/sqlite/catalog_data.db"
  exit 1
fi

if [ ! -f ./db/sqlite/catalog_data.db.commitid ]; then
  echo "ERROR: SQLite commit id file not found: ./db/sqlite/catalog_data.db.commitid"
  exit 1
fi

echo "Done. Copy the following files to airsoft_spotter/app/src/main/assets/:"
echo "  - ./db/realm/catalog_data.realm"
echo "  - ./db/realm/catalog_data.realm.commitid"
echo "  - ./db/sqlite/catalog_data.db"
echo "  - ./db/sqlite/catalog_data.db.commitid"
