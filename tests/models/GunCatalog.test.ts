import * as GunCatalog from "../../src/models/GunCatalog";

describe("GunCatalog test", () => {
    test("isValidGunCatalog should success for generic marui", () => {
        const gun = {
            _id: 1100,
            manufacturerId: "marui",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            powerLevel: 1, // lowFps: true,
            generic: true,
        };
        expect(GunCatalog.isValidGunCatalog(gun)).toBeTruthy();
    });

    test("isValidGunCatalog: _id is minus should fail", () => {
        const gun = {
            _id: -1,
            manufacturerId: "marui",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            powerLevel: 1, // lowFps: true,
            generic: true,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: _id is not in valid ranges should fail", () => {
        const gun = {
            _id: 20000,
            manufacturerId: "marui",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            powerLevel: 1, // lowFps: true,
            generic: false,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: generic gun which _id is greater than 1000 should fail", () => {
        const gun = {
            _id: 11000,
            manufacturerId: "marui",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            powerLevel: 1, // lowFps: true,
            generic: true,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: manufacturerId is empty", () => {
        const gun = {
            _id: 0,
            manufacturerId: "",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            powerLevel: 1, // lowFps: true,
            generic: false,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: shortName is empty", () => {
        const gun = {
            _id: 11000,
            manufacturerId: "marui",
            shortName: "",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            powerLevel: 1, // lowFps: true,
            generic: false,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: shortName is not latin", () => {
        const gun = {
            _id: 11000,
            manufacturerId: "marui",
            shortName: "テスト",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            powerLevel: 1, // lowFps: true,
            generic: false,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: fullName is not latin", () => {
        const gun = {
            _id: 11000,
            manufacturerId: "marui",
            shortName: "test",
            fullName: "テスト",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            powerLevel: 1, // lowFps: true,
            generic: false,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: shortNameJa contains full width brackets", () => {
        const gun = {
            _id: 11000,
            manufacturerId: "marui",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "（test）",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            powerLevel: 1, // lowFps: true,
            generic: false,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: fullNameJa contains full width brackets", () => {
        const gun = {
            _id: 11000,
            manufacturerId: "marui",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "（test）",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            powerLevel: 1, // lowFps: true,
            generic: false,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: type is invalid", () => {
        const gun = {
            _id: 11000,
            manufacturerId: "marui",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 100,
            powerSource: 0,
            powerLevel: 1, // lowFps: true,
            generic: false,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: powerSource is invalid", () => {
        const gun = {
            _id: 11000,
            manufacturerId: "marui",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 100,
            powerLevel: 1, // lowFps: true,
            generic: false,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: powerLevel is undefined", () => {
        const gun = {
            _id: 11000,
            manufacturerId: "marui",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            generic: false,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun as GunCatalog.IGunCatalog)).toThrow(TypeError);
    });

    test("isValidGunCatalog: unknown manufacturer should not be generic", () => {
        const gun = {
            _id: 0,
            manufacturerId: "unknown",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            generic: true,
            deleted: false,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun as GunCatalog.IGunCatalog)).toThrow(TypeError);
    });

});