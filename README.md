# Airsoft Database for Airsoft Spotter Application

This is a database of airsoft guns used in the [AIRSOFT SPOTTER](https://precision-marks.com) application.

## Report Incorrect Data / Request to Add a New Airsoft Gun

Open the following link: 
https://github.com/Precision-Marks/airsoft_database/issues/new/choose

## Environments required

Node.js: v20 (Tested by v20.8.1)
npm >= 10.1.0

Run `npm install` to install required packages.

## Test/Verify CSV database source files

`npm run test-database`

## Create binary database

`sh create_database.sh`

## Contribution

To add/modify the gun database edit [./source_data/RealmGunCatalog.csv](./source_data/RealmGunCatalog.csv)

To add/modify manufacturer database, edit [./source_data/RealmManufacturerCatalog.csv](./source_data/RealmManufacturerCatalog.csv)

Please refer to the [Data Schema](#data-schema) section below for details on the required fields and format for these CSV files.

If you add a manufacturer, you should also add "generic" gun data in RealmGunCatalog.csv. The "generic" data has ID &lt; 10000 and starts from 0,25,50,75.
And also set `src/models/GunIdRange.ts`. Gun ID for a manufacturer starts from n x 1000 to n x 1000 + 999.

## Data Schema

Details about the structure and fields of the CSV source files can be found in the following documents:

* **Manufacturer Catalog Schema:** Describes the format of `source_data/RealmManufacturerCatalog.csv`. See [docs/ManufacturerCatalog.md](./docs/ManufacturerCatalog.md).
* **Gun Catalog Schema:** Describes the format of `source_data/RealmGunCatalog.csv`. See [docs/GunCatalog.md](./docs/GunCatalog.md).

## VsCode extensions recommended

* Rainbow CSV
* vscode-input-sequence: To set sequential id numbers
