import path from "path";
import * as ParseCSV from "../src/parseCSV";
import { RealmManufacturerCatalog } from "../src/schemas/RealmManufacturerCatalog";
import { RealmGunCatalog } from "../src/schemas/RealmGunCatalog";
import { RealmShootingRuleCatalog } from "../src/schemas/RealmShootingRuleCatalog";

const manufacturerCSV = `_id,shortName,longName,description,url,shortNameJa,longNameJa,descriptionJa,urlJa
agm,"AGM","","","","","","",""
marui,"MARUI","TOKYO MARUI","","https://www.tokyo-marui.co.jp/","マルイ","東京マルイ","",""

other,"Other Manufacturer","","",,"その他の製造元","","",""
unknown,"","","",,"","","",""`;

const manufacturerRecords = [
    {
        _id: "agm",
        shortName: "AGM",
        longName: undefined,
        description: undefined,
        url: undefined,
        shortNameJa: undefined,
        longNameJa: undefined,
        descriptionJa: undefined,
        urlJa: undefined,
    },
    {
        _id: "marui",
        shortName: "MARUI",
        longName: "TOKYO MARUI",
        description: undefined,
        url: "https://www.tokyo-marui.co.jp/",
        shortNameJa: "マルイ",
        longNameJa: "東京マルイ",
        descriptionJa: undefined,
        urlJa: undefined,
    },
    null,
    {
        _id: "other",
        shortName: "Other Manufacturer",
        longName: undefined,
        description: undefined,
        url: undefined,
        shortNameJa: "その他の製造元",
        longNameJa: undefined,
        descriptionJa: undefined,
        urlJa: undefined,
    },
    {
        _id: "unknown",
        shortName: undefined,
        longName: undefined,
        description: undefined,
        url: undefined,
        shortNameJa: undefined,
        longNameJa: undefined,
        descriptionJa: undefined,
        urlJa: undefined,
    },
];

const gunCSV = `_id,manufacturerId,shortName,fullName,description,shortNameJa,fullNameJa,descriptionJa,type,powerSource,lowFps,generic,deleted
0,"unknown","Handgun","","","ハンドガン","","",1,0,false,false

10133,"marui","P-90","","Standard-Type series","P-90","","電動ガンスタンダードタイプ",2,2,false`

const gunRecords = [
    {
        _id: 0,
        manufacturerId: "unknown",
        shortName: "Handgun",
        fullName: undefined,
        description: undefined,
        shortNameJa: "ハンドガン",
        fullNameJa: undefined,
        descriptionJa: undefined,
        type: 1,
        powerSource: 0,
        lowFps: false,
        generic: false,
        // deleted: undefined,
    },
    null,
    {
        _id: 10133,
        manufacturerId: "marui",
        shortName: "P-90",
        fullName: undefined,
        description: "Standard-Type series",
        shortNameJa: "P-90",
        fullNameJa: undefined,
        descriptionJa: "電動ガンスタンダードタイプ",
        type: 2,
        powerSource: 2,
        lowFps: false,
        // generic: undefined,
        // deleted: undefined,
    }
];

const shootingRuleCSV = `_id,type,name,description,url,nameJa,descriptionJa,urlJa,range100x,unitOfRange,virtualTargetName,positionsMask,gunTypesMask,sightTypesMask,numOfShots,duration,numOfStages,nextId
1,"","5m Slow Fire Freestyle","5m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.","","5m 精密射撃 フリースタイル","5m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。","",500,0,"",0,0,0,10,240,1,2
51,"nra_onestring","5 yard Slow Fire Precision Pistol","5yds (4.57m), 10 shots in 10min. Handgun only, any sights except laser pointer are allowed. Standing position, with the gun held in one hand only. Quater-sized B6 target.","","5ヤード 精密射撃 Precision Pistol","5ヤード(4.57m), 10発/10分。立射片手撃ちハンドガンのみ。サイトはレーザーポインタ以外使用可能。1/4サイズのB6ターゲット。","",500,1,"nra_b6",1,1,15,10,600,1,52
`;

const shootingRuleRecords = [
    {
        _id: 1,
        type: undefined,
        name: "5m Slow Fire Freestyle",
        description: "5m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.",
        url: undefined,
        nameJa: "5m 精密射撃 フリースタイル",
        descriptionJa: "5m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。",
        urlJa: undefined,
        range100x: 500,
        unitOfRange: 0,
        virtualTargetName: undefined,
        positionsMask: 0,
        gunTypesMask: 0,
        sightTypesMask: 0,
        numOfShots: 10,
        duration: 240,
        numOfStages: 1,
        nextId: 2,
    },
    {
        _id: 51,
        type: "nra_onestring",
        name: "5 yard Slow Fire Precision Pistol",
        description: "5yds (4.57m), 10 shots in 10min. Handgun only, any sights except laser pointer are allowed. Standing position, with the gun held in one hand only. Quater-sized B6 target.",
        url: undefined,
        nameJa: "5ヤード 精密射撃 Precision Pistol",
        descriptionJa: "5ヤード(4.57m), 10発/10分。立射片手撃ちハンドガンのみ。サイトはレーザーポインタ以外使用可能。1/4サイズのB6ターゲット。",
        urlJa: undefined,
        range100x: 500,
        unitOfRange: 1,
        virtualTargetName: "nra_b6",
        positionsMask: 1,
        gunTypesMask: 1,
        sightTypesMask: 15,
        numOfShots: 10,
        duration: 600,
        numOfStages: 1,
        nextId: 52,
    }
];

const testData = [
    {
        name: "RealmManufacturerCatalog",
        csvString: manufacturerCSV,
        csvFile: path.join(__dirname, "./testdata/testManufacturer.csv"),
        records: manufacturerRecords,
        schema: RealmManufacturerCatalog.schema,
    },
    {
        name: "RealmGunCatalog",
        csvString: gunCSV,
        csvFile: path.join(__dirname, "./testdata/testGun.csv"),
        records: gunRecords,
        schema: RealmGunCatalog.schema,
    },
    {
        name: "RealmShootingRuleCatalog",
        csvString: shootingRuleCSV,
        csvFile: path.join(__dirname, "./testdata/testShootingRule.csv"),
        records: shootingRuleRecords,
        schema: RealmShootingRuleCatalog.schema,
    }
]

describe("test parseCSV", () => {
    testData.forEach((data) => {
        test(`test parseCsvFile for ${data.name}`, () => {
            const records = ParseCSV.parseCsvFile(data.csvFile, data.schema);
            expect(records).toEqual(data.records);
        });
    });

    testData.forEach((data) => {
        test(`test parseCsvString for ${data.name}`, () => {
            const records = ParseCSV.parseCsvString(data.csvString, data.schema);
            expect(records).toEqual(data.records);
        });
    });
});