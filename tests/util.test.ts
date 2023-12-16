import { RealmGunCatalog } from "../src/schemas/RealmGunCatalog";
import { RealmManufacturerCatalog } from "../src/schemas/RealmManufacturerCatalog";
import { RealmShootingRuleCatalog } from "../src/schemas/RealmShootingRuleCatalog";

import * as Util from "../src/util";

describe('replaceEmptyStringsWithNull function test', () => {
    test("replaceEmptyStringsWithNull", () => {
        const gunCatalogOrg = {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "",
            description: "",
            shortNameJa: "",
            fullNameJa: "",
            descriptionJa: "",
            type: 1,
            powerSource: 2,
            lowFps: true,
            generic: undefined,
            deleted: undefined,
        }
        
        const gunCatalogExpected = {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: undefined,
            description: undefined,
            shortNameJa: undefined,
            fullNameJa: undefined,
            descriptionJa: undefined,
            type: 1,
            powerSource: 2,
            lowFps: true,
            generic: undefined,
            deleted: undefined,
        }
        
        const schema = RealmGunCatalog.schema;
        const gunCatalog = structuredClone(gunCatalogOrg);
        Util.replaceEmptyStringsWithUndefined(gunCatalog, schema);
        expect(gunCatalog).toEqual(gunCatalogExpected);
    });
});

describe('validateProperties function tests', () => {

    const gunCatalogSuccessList = [
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: undefined,
            description: undefined,
            shortNameJa: undefined,
            fullNameJa: undefined,
            descriptionJa: undefined,
            type: 1,
            powerSource: 2,
            lowFps: true,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "other",
            shortName: "Other Gun",
            fullName: undefined,
            description: undefined,
            shortNameJa: undefined,
            fullNameJa: undefined,
            descriptionJa: undefined,
            type: 1,
            powerSource: 2,
            lowFps: false,
            generic: true,
            deleted: undefined,
        },
        {
            _id: "10", // Will convert to int
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: undefined,
            description: undefined,
            shortNameJa: undefined,
            fullNameJa: undefined,
            descriptionJa: undefined,
            type: 1,
            powerSource: 2,
            lowFps: true,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: "10", // Will convert to int
            manufacturerId: "marui",
            shortName: "M4A1",
            // fullName: undefined,
            // description: undefined,
            // shortNameJa: undefined,
            // fullNameJa: undefined,
            // descriptionJa: undefined,
            type: 1,
            powerSource: 2,
            lowFps: true,
            // generic: undefined,
            // deleted: undefined,
        },
    ];

    const gunCatalogFailList = [
        {
            _id: "a", // Bad
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: undefined,
            description: undefined,
            shortNameJa: undefined,
            fullNameJa: undefined,
            descriptionJa: undefined,
            type: 1,
            powerSource: 2,
            lowFps: true,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: undefined, // Bad
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: 1, // Bad
            shortName: "Other Gun",
            fullName: undefined,
            description: undefined,
            shortNameJa: undefined,
            fullNameJa: undefined,
            descriptionJa: undefined,
            type: 1,
            powerSource: 2,
            lowFps: false,
            generic: true,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: 3, // Bad
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: 4, // Bad
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: 5, // Bad
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: 6 , // Bad
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: 7, // Bad
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: 8,  // Bad
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: 9, // Bad
            type: 2,
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: undefined, // Bad
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: undefined, // Bad
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: "bb", // Bad
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: undefined, // Bad
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: "cc",   // Bad
            lowFps: false,
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: undefined, // Bad
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: 4, // Bad
            generic: undefined,
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: false,
            generic: 1, // Bad
            deleted: undefined,
        },
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4A1",
            fullName: "M4A1 Carbine",
            description: "M4A1 Carbine is a gas blowback rifle.",
            shortNameJa: "M4A1 カービン",
            fullNameJa: "M4A1 カービン",
            descriptionJa: "M4A1 カービンはガスブローバックライフルです。",
            type: 2,
            powerSource: 2,
            lowFps: false,
            generic: undefined,
            deleted: 1, // Bad
        },
    ];
    
    const schema = RealmGunCatalog.schema;

    gunCatalogSuccessList.forEach((gunCatalog, index) => {
        test('validateProperties success. test: ' + index, () => {
            expect(Util.validateProperties(gunCatalog, schema)).toBe(true);
        });
    });

    gunCatalogFailList.forEach((gunCatalog, index) => {
        test('validateProperties fail. test: ' + index, () => {
            expect(() => Util.validateProperties(gunCatalog, schema)).toThrow();
        });
    });
});