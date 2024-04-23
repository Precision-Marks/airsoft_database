import * as ManufacturerCatalog from '../../src/models/ManufacturerCatalog';

describe('ManufacturerCatalog test', () => {
    test('isValidManufacturerCatalog', () => {
        const manufacturer = {
            _id: 'unknown', // Should be valid manufacturer id
            shortName: 'test',
            longName: 'test',
            altName: 'altName',
            description: 'test',
            url: 'https://example.com/',
            shortNameJa: 'test',
            longNameJa: 'test',
            altNameJa: 'altNameJa',
            descriptionJa: 'test',
            urlJa: 'https://example.com',
        };
        expect(ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toBeTruthy();
    });

    test('isValidManufacturerCatalog: _id is empty', () => {
        const manufacturer = {
            _id: '',
            shortName: 'test',
            longName: 'test',
            altName: 'altName',
            description: 'test',
            url: 'https://example.com/',
            shortNameJa: 'test',
            longNameJa: 'test',
            altNameJa: 'altNameJa',
            descriptionJa: 'test',
            urlJa: 'https://example.com',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

    test('isValidManufacturerCatalog: _id is not latin', () => {
        const manufacturer = {
            _id: 'テスト',
            shortName: 'test',
            longName: 'test',
            altName: 'altName',
            description: 'test',
            url: 'https://example.com/',
            shortNameJa: 'test',
            longNameJa: 'test',
            altNameJa: 'altNameJa',
            descriptionJa: 'test',
            urlJa: 'https://example.com',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

    test('isValidManufacturerCatalog: shortName is not latin', () => {
        const manufacturer = {
            _id: 'unknown',
            shortName: 'テスト',
            longName: 'test',
            altName: 'altName',
            description: 'test',
            url: 'https://example.com/',
            shortNameJa: 'test',
            longNameJa: 'test',
            altNameJa: 'altNameJa',
            descriptionJa: 'test',
            urlJa: 'https://example.com',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

    test('isValidManufacturerCatalog: longName is not latin', () => {
        const manufacturer = {
            _id: 'unknown',
            shortName: 'test',
            longName: 'テスト',
            altName: 'altName',
            description: 'test',
            url: 'https://example.com/',
            shortNameJa: 'test',
            longNameJa: 'test',
            altNameJa: 'altNameJa',
            descriptionJa: 'test',
            urlJa: 'https://example.com',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

    test('isValidManufacturerCatalog: url does not start with http', () => {
        const manufacturer = {
            _id: 'unknown',
            shortName: 'test',
            longName: 'test',
            altName: 'altName',
            description: 'test',
            url: 'test',
            shortNameJa: 'test',
            longNameJa: 'test',
            altNameJa: 'altNameJa',
            descriptionJa: 'test',
            urlJa: 'https://example.com',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

    test('isValidManufacturerCatalog: urlJa does not start with http', () => {
        const manufacturer = {
            _id: 'unknown',
            shortName: 'test',
            longName: 'test',
            altName: 'altName',
            description: 'test',
            url: 'http://test',
            shortNameJa: 'test',
            longNameJa: 'test',
            altNameJa: 'altNameJa',
            descriptionJa: 'test',
            urlJa: 'test',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

    test('isValidManufacturerCatalog: empty shortName', () => {
        const manufacturer = {
            _id: 'unknown',
            shortName: '',
            longName: 'test',
            altName: 'altName',
            description: 'test',
            url: 'http://test',
            shortNameJa: 'test',
            longNameJa: 'test',
            altNameJa: 'altNameJa',
            descriptionJa: 'test',
            urlJa: 'test',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

});