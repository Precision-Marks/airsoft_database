import * as GunCatalog from "../../src/models/GunCatalog";

describe("GunCatalog test", () => {
    test("isValidGunCatalog", () => {
        const gun = {
            _id: 0,
            manufacturerId: "test",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            lowFps: true,
            generic: true,
            deleted: true,
        };
        expect(GunCatalog.isValidGunCatalog(gun)).toBeTruthy();
    });

    test("isValidGunCatalog: _id is minus", () => {
        const gun = {
            _id: -1,
            manufacturerId: "test",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            lowFps: true,
            generic: true,
            deleted: true,
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
            lowFps: true,
            generic: true,
            deleted: true,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: shortName is empty", () => {
        const gun = {
            _id: 0,
            manufacturerId: "test",
            shortName: "",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            lowFps: true,
            generic: true,
            deleted: true,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: shortName is not latin", () => {
        const gun = {
            _id: 0,
            manufacturerId: "test",
            shortName: "テスト",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            lowFps: true,
            generic: true,
            deleted: true,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: fullName is not latin", () => {
        const gun = {
            _id: 0,
            manufacturerId: "test",
            shortName: "test",
            fullName: "テスト",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            lowFps: true,
            generic: true,
            deleted: true,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: shortNameJa contains full width brackets", () => {
        const gun = {
            _id: 0,
            manufacturerId: "test",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "（test）",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            lowFps: true,
            generic: true,
            deleted: true,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: fullNameJa contains full width brackets", () => {
        const gun = {
            _id: 0,
            manufacturerId: "test",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "（test）",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            lowFps: true,
            generic: true,
            deleted: true,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: type is invalid", () => {
        const gun = {
            _id: 0,
            manufacturerId: "test",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 100,
            powerSource: 0,
            lowFps: true,
            generic: true,
            deleted: true,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: powerSource is invalid", () => {
        const gun = {
            _id: 0,
            manufacturerId: "test",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 100,
            lowFps: true,
            generic: true,
            deleted: true,
        };
        expect(() => GunCatalog.isValidGunCatalog(gun)).toThrow(TypeError);
    });

    test("isValidGunCatalog: lowFps is undefined", () => {
        const gun = {
            _id: 0,
            manufacturerId: "test",
            shortName: "test",
            fullName: "test",
            description: "test",
            shortNameJa: "test",
            fullNameJa: "test",
            descriptionJa: "test",
            type: 0,
            powerSource: 0,
            generic: true,
            deleted: true,
        };
        expect(GunCatalog.isValidGunCatalog(gun as GunCatalog.IGunCatalog)).toBeFalsy();
    });
});