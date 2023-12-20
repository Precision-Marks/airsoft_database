import { IManufacturerCatalog } from "../src/models/ManufacturerCatalog";
import { RealmGunCatalog } from "../src/schemas/RealmGunCatalog";
import { RealmManufacturerCatalog } from "../src/schemas/RealmManufacturerCatalog";
import { RealmShootingRuleCatalog } from "../src/schemas/RealmShootingRuleCatalog";

import * as Util from "../src/utils";

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
        {
            _id: 0,
            manufacturerId: "marui",
            shortName: "M4\x0aA1", // Bad. Contains control code
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
        }
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

describe('String utils tests', () => {
    test('isAlphaNumeric', () => {
        expect(Util.isAlphaNumeric("abc")).toBe(true);
        expect(Util.isAlphaNumeric("abc123")).toBe(true);
    });

    test('isPrintableAscii', () => {
        expect(Util.isPrintableAscii("abc")).toBe(true);
        expect(Util.isPrintableAscii("abc123")).toBe(true);
        expect(Util.isPrintableAscii("abcあいう")).toBe(false);
        expect(Util.isPrintableAscii("abc\t")).toBe(false);
    });

    test('containControlCharacter', () => {
        expect(Util.containControlCharacter("abc")).toBe(false);
        expect(Util.containControlCharacter("abc\t")).toBe(true);
        expect(Util.containControlCharacter("abc\u00A0")).toBe(false);
        expect(Util.containControlCharacter("abc\u17B5")).toBe(true);
        expect(Util.containControlCharacter("abc\u2000")).toBe(true);
    });

    test('isLatinOrGreek', () => {
        expect(Util.isLatinOrGreek("abc")).toBe(true);
        expect(Util.isLatinOrGreek("abcΣⅢ")).toBe(true);
        expect(Util.isLatinOrGreek("Nürnberg")).toBe(true);

        expect(Util.isLatinOrGreek("あいう")).toBe(false);
        expect(Util.isLatinOrGreek("abcあいう")).toBe(false);
        expect(Util.isLatinOrGreek("abcあいうabc")).toBe(false);
        expect(Util.isLatinOrGreek("abcあいうabcあいう")).toBe(false);
        // Control code should be rejected
        expect(Util.isLatinOrGreek("abc\u000a")).toBe(false);
        expect(Util.isLatinOrGreek("abc\u009E")).toBe(false);
        // Latin-1 Punctuation should be accepted
        expect(Util.isLatinOrGreek("abc\u00A1")).toBe(true);
        expect(Util.isLatinOrGreek("abc\u00FF")).toBe(true);
    });

    test('isLatinOrGreekOrEmpty() tests', () => {
        expect(Util.isLatinOrGreekOrEmpty("abc")).toBe(true);
        expect(Util.isLatinOrGreekOrEmpty("")).toBe(true);
        expect(Util.isLatinOrGreekOrEmpty("あいう")).toBe(false);
        expect(Util.isLatinOrGreekOrEmpty("abcあいう")).toBe(false);
        expect(Util.isLatinOrGreekOrEmpty("abcあいうabc")).toBe(false);
        expect(Util.isLatinOrGreekOrEmpty("abcあいうabcあいう")).toBe(false);
    });

    test('isSameString() tests', () => {
        expect(Util.isSameString("abc", "abc")).toBe(true);
        expect(Util.isSameString("abc", "ABC")).toBe(true);
        expect(Util.isSameString(" abc", "abc")).toBe(true);
        expect(Util.isSameString("abc ", "abc")).toBe(true);
        expect(Util.isSameString(" abc ", "abc")).toBe(true);

        expect(Util.isSameString("abc", "あいう")).toBe(false);
        expect(Util.isSameString(undefined, "abc")).toBe(false);
        expect(Util.isSameString("abc", undefined)).toBe(false);
        expect(Util.isSameString(undefined, undefined)).toBe(true);
    });

    test('fuzzyStringCompare() tests', () => {
        expect(Util.fuzzyStringCompare("abc", "abc")).toBe(true);
        expect(Util.fuzzyStringCompare("abc", "ABC")).toBe(true);
        expect(Util.fuzzyStringCompare("a bc", "abc")).toBe(true);
        expect(Util.fuzzyStringCompare("a.bc ", "ab.c")).toBe(true);
        expect(Util.fuzzyStringCompare("ab-c", "AB C")).toBe(true);

        expect(Util.fuzzyStringCompare("abc", "あいう")).toBe(false);
    });
});

describe('compareInstances() tests', () => {
    const manufacturerCatalog1 = {
        _id: "marui",
        shortName: "Marui",
        longName: "Tokyo Marui",
        description: "Tokyo Marui is a Japanese airsoft manufacturer.",
        url: "https://example.com/",
        shortNameJa: "マルイ",
        longNameJa: "東京マルイ",
        descriptionJa: "東京マルイは日本のエアソフトガンメーカーです。",
        urlJa: "https://example.com/",
    };

    const manufacturerCatalog2: IManufacturerCatalog = { // Same with manufacturerCatalog1
        _id: "marui",
        shortName: "Marui",
        longName: "Tokyo Marui",
        description: "Tokyo Marui is a Japanese airsoft manufacturer.",
        url: "https://example.com/",
        shortNameJa: "マルイ",
        longNameJa: "東京マルイ",
        descriptionJa: "東京マルイは日本のエアソフトガンメーカーです。",
        urlJa: "https://example.com/",
    };

    const manufacturerCatalog3: IManufacturerCatalog = {
        _id: "notmarui", // different _id from manufacturerCatalog1
        shortName: "Marui",
        longName: "Tokyo Marui",
        description: "Tokyo Marui is a Japanese airsoft manufacturer.",
        url: "https://example.com/",
        shortNameJa: "マルイ",
        longNameJa: "東京マルイ",
        descriptionJa: "東京マルイは日本のエアソフトガンメーカーです。",
        urlJa: "https://example.com/",
    };

    const manufacturerCatalog4: IManufacturerCatalog = {
        _id: "marui",
        shortName: "marui", // Lower case
        longName: "Tokyo Marui",
        description: "Tokyo Marui is a Japanese airsoft manufacturer.",
        url: "https://example.com/",
        shortNameJa: "マルイ",
        longNameJa: "東京マルイ",
        descriptionJa: "東京マルイは日本のエアソフトガンメーカーです。",
        urlJa: "https://example.com/",
    };

    const manufacturerCatalog5: IManufacturerCatalog = {
        _id: "crown",
        shortName: "CROWN",
        longName: "CROWN MODEL",
        description: undefined,
        url: "https://example2.com/",
        shortNameJa: "クラウン",
        longNameJa: "クラウンモデル",
        descriptionJa: undefined,
        urlJa: undefined,
    };

    test('compareInstances() tests', () => {
        const includeProps = ["shortName", "longName", "description", "url", "shortNameJa", "longNameJa", "descriptionJa", "urlJa"];

        // All the same instances
        expect(Util.compareInstances(manufacturerCatalog1, manufacturerCatalog2, includeProps)).toBe(true);
        // Same instances except _id
        expect(Util.compareInstances(manufacturerCatalog1, manufacturerCatalog3, includeProps)).toBe(true);
        // Same instances except shortName which is lower case
        expect(Util.compareInstances(manufacturerCatalog1, manufacturerCatalog4, includeProps)).toBe(true);
        // Different instances
        expect(Util.compareInstances(manufacturerCatalog1, manufacturerCatalog5, includeProps)).toBe(false);
    });
});
