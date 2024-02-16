# Airsoft Database for Airsoft Spotter application

### Environments required

Node.js: v20 (Tested by v20.8.1)
npm >= 10.1.0

Run `npm install` to install required packages.

## Test/Verify CSV database source files

`npm run test-database`

## Create binary database

`npm run create-database`

## Contribution

To add/modify the gun database edit [./source_data/RealmGunCatalog.csv](./source_data/RealmGunCatalog.csv)

To add/modify manufacturer database, edit [./source_data/RealmManufacturerCatalog.csv](./source_data/RealmManufacturerCatalog.csv)

If you add a manufacturer, you also add "generic" gun data in RealmGunCatalog.csv. The "generic" data has ID &lt; 10000 and starts from 0,25,50,75. 日本の製造元の場合、powerLevelは0 or 2. それ以外の国の場合powerLevelは0 or 1.

## VsCode extensions recommended

- Rainbow CSV
- vscode-input-sequence: To set sequential id numbers
