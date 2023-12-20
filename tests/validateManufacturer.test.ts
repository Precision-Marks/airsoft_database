import { IManufacturerCatalog } from "../src/models/ManufacturerCatalog";
import { validateManufacturer } from "../src/validateManufacturer";

const manufacturer0: IManufacturerCatalog = {
    _id: 'test',
    shortName: 'test',
    longName: 'test',
    description: 'test',
    url: 'https://example.com/',
    shortNameJa: 'test',
    longNameJa: 'test',
    descriptionJa: 'test',
    urlJa: 'https://example.com',
};

const manufacturer1: IManufacturerCatalog = {
    _id: 'test', // duplicate
    shortName: 'test1', // Unique shortName
    longName: 'test1', // Unique longName
    description: 'test',
    url: 'https://example.com/',
    shortNameJa: 'test',
    longNameJa: 'test',
    descriptionJa: 'test',
    urlJa: 'https://example.com',
};

const manufacturer2: IManufacturerCatalog = {
    _id: 'test2', // Unique _id
    shortName: 'test', // duplicate shortName
    longName: 'test',
    description: 'test',
    url: 'https://example.com/',
    shortNameJa: 'test',
    longNameJa: 'test',
    descriptionJa: 'test',
    urlJa: 'https://example.com',
};

const manufacturer3: IManufacturerCatalog = {
    _id: 'test3',   // Unique _id
    shortName: 'test3', // Unique shortName
    longName: 'test', // duplicate longName
    description: 'test',
    url: 'https://example.com/',
    shortNameJa: 'test',
    longNameJa: 'test',
    descriptionJa: 'test',
    urlJa: 'https://example.com',
};

const manufacturer4: IManufacturerCatalog = {
    _id: 'test4',   // Unique _id
    shortName: 'test4', // Unique shortName
    longName: 'test4', // Unique longName
    description: 'test4',
    url: 'https://example.com/',
    shortNameJa: 'test4',
    longNameJa: 'test4',
    descriptionJa: 'test4',
    urlJa: 'https://example.com',
};

describe("validateManufacturer() tests", () => {
    test("validateManufacturer() should success", () => {
        expect(validateManufacturer([manufacturer0, null, null, manufacturer4])).toBeTruthy();
    });

    test("validateManufacturer() duplicate _id", () => {
        expect(() => validateManufacturer([manufacturer0, null, null, manufacturer1])).toThrow(TypeError);
    });

    test("validateManufacturer() duplicate shortName", () => {
        expect(() => validateManufacturer([manufacturer0, null, null, manufacturer2])).toThrow(TypeError);
    });

    test("validateManufacturer() duplicate longName", () => {
        expect(() => validateManufacturer([manufacturer0, null, null, manufacturer3])).toThrow(TypeError);
    });
});