import { IGunCatalog } from "../src/models/GunCatalog";
import { validateGun } from "../src/validateGun";

const gun0: IGunCatalog = {
    _id: 0,
    manufacturerId: "test manufacturer",
    shortName: "test shortName",
    fullName: "test fullName",
    description: "test description",
    shortNameJa: "test shortNameJa",
    fullNameJa: "test fullNameJa",
    descriptionJa: "test descriptionJa",
    type: 1,
    powerSource: 1,
    powerLevel: 0, // lowFps: false,
    generic: undefined,
    deleted: undefined,
};

const gun1: IGunCatalog = { // Has duplicate id with gun0
    _id: 0, // duplicate id
    manufacturerId: "test1 manufacturer",
    shortName: "test1 shortName",
    fullName: "test1 fullName",
    description: "test description",
    shortNameJa: "test1 shortNameJa",
    fullNameJa: "test1 fullNameJa",
    descriptionJa: "test1 descriptionJa",
    type: 1,
    powerSource: 1,
    powerLevel: 0, // lowFps: false,
    generic: undefined,
    deleted: undefined,
};

const gun2: IGunCatalog = { // Completely different with gun0
    _id: 2, // Unique id
    manufacturerId: "test2 manufacturer",   // Unique manufacturerId
    shortName: "test2 shortName", // Unique shortName
    fullName: "test2 fullName", // Unique fullName
    description: "test2 description", // Unique description
    shortNameJa: "test2 shortNameJa", // Unique shortNameJa
    fullNameJa: "test2 fullNameJa", // Unique fullNameJa
    descriptionJa: "test2 descriptionJa", // Unique descriptionJa
    type: 1,
    powerSource: 1,
    powerLevel: 0, // lowFps: false,
    generic: undefined,
    deleted: undefined,
};

const gun3: IGunCatalog = { // Unique id, but duplicate shortName with gun0
    _id: 3, // Unique id
    manufacturerId: "test manufacturer",
    shortName: "test shortName", // The same with gun0
    fullName: "test fullName",
    description: "test description",
    shortNameJa: "test shortNameJa",
    fullNameJa: "test fullNameJa",
    descriptionJa: "test descriptionJa",
    type: 1,
    powerSource: 1,
    powerLevel: 0, // lowFps: false,
    generic: undefined,
    deleted: undefined,
};

const gun4: IGunCatalog = { // Unique id, but duplicate fullName with gun0
    _id: 4,
    manufacturerId: "test manufacturer",
    shortName: "test4 shortName",
    fullName: "test fullName",
    description: "test description",
    shortNameJa: "test shortNameJa",
    fullNameJa: "test fullNameJa",
    descriptionJa: "test descriptionJa",
    type: 1,
    powerSource: 1,
    powerLevel: 0, // lowFps: false,
    generic: undefined,
    deleted: undefined,
};

const gun5: IGunCatalog = { // Unique id and shortName/fullName, but duplicate shortNameJa with gun0
    _id: 5, // Unique id
    manufacturerId: "test manufacturer", // Unique manufacturerId
    shortName: "test5 shortName", // The same with gun0
    fullName: "test5 fullName",
    description: "test description",
    shortNameJa: "test shortNameJa",
    fullNameJa: "test fullNameJa",
    descriptionJa: "test descriptionJa",
    type: 1,
    powerSource: 1,
    powerLevel: 0, // lowFps: false,
    generic: undefined,
    deleted: undefined,
};

const gun6: IGunCatalog = { // Unique id and shortName/fullName/shortNameJa, but duplicate fullNameJa with gun0
    _id: 6,
    manufacturerId: "test manufacturer",
    shortName: "test4 shortName",
    fullName: "test4 fullName",
    description: "test description",
    shortNameJa: "test4 shortNameJa",
    fullNameJa: "test fullNameJa",
    descriptionJa: "test descriptionJa",
    type: 1,
    powerSource: 1,
    powerLevel: 0, // lowFps: false,
    generic: undefined,
    deleted: undefined,
};

const gun7: IGunCatalog = { // Almost the same with gun0 but powerSource is different
    _id: 7,
    manufacturerId: "test manufacturer",
    shortName: "test shortName",
    fullName: "test fullName",
    description: "test description",
    shortNameJa: "test shortNameJa",
    fullNameJa: "test fullNameJa",
    descriptionJa: "test descriptionJa",
    type: 1,
    powerSource: 2,
    powerLevel: 0, // lowFps: false,
    generic: undefined,
    deleted: undefined,
};

const gun8: IGunCatalog = { // Almost the same with gun0 but powerLevel is different
    _id: 8,
    manufacturerId: "test manufacturer",
    shortName: "test shortName",
    fullName: "test fullName",
    description: "test description",
    shortNameJa: "test shortNameJa",
    fullNameJa: "test fullNameJa",
    descriptionJa: "test descriptionJa",
    type: 1,
    powerSource: 1,
    powerLevel: 1, // lowFps: true,
    generic: undefined,
    deleted: undefined,
};

const gun9: IGunCatalog = { // Almost the same with gun0 but id and manufacturerId are different
    _id: 9,
    manufacturerId: "test9 manufacturer",
    shortName: "test shortName",
    fullName: "test fullName",
    description: "test description",
    shortNameJa: "test shortNameJa",
    fullNameJa: "test fullNameJa",
    descriptionJa: "test descriptionJa",
    type: 1,
    powerSource: 1,
    powerLevel: 0, // lowFps: false,
    generic: undefined,
    deleted: undefined,
};

describe("validateGun() tests", () => {
    test("validateGun() with duplicate id should throw", () => {
        expect(() => validateGun([gun0, null, null, gun1])).toThrow(TypeError);
    });

    test("validateGun() should success", () => {
        expect(validateGun([gun0, gun2])).toBeTruthy();
    });

    test("validateGun() with duplicate shortName should throw", () => {
        expect(() => validateGun([gun0, null, null,  gun3])).toThrow(TypeError);
    });

    test("validateGun() with duplicate fullName should throw", () => {
        expect(() => validateGun([gun0, null, null,  gun4])).toThrow(TypeError);
    });

    test("validateGun() with duplicate shortNameJa should throw", () => {
        expect(() => validateGun([gun0, null, null,  gun5])).toThrow(TypeError);
    });

    test("validateGun() with duplicate fullNameJa should throw", () => {
        expect(() => validateGun([gun0, null, null,  gun6])).toThrow(TypeError);
    });

    test("validateGun() with different powerSource should success", () => {
        expect(validateGun([gun0, null, null,  gun7])).toBeTruthy();
    });

    test("validateGun() with different powerLevel should success", () => {
        expect(validateGun([gun0, null, null,  gun8])).toBeTruthy();
    });

    test("validateGun() with different id and manufacturerId should success", () => {
        expect(validateGun([gun0, null, null,  gun9])).toBeTruthy();
    });
});


