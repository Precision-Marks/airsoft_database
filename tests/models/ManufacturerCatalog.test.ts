import * as ManufacturerCatalog from '../../src/models/ManufacturerCatalog';

describe('ManufacturerCatalog test', () => {
    test('isValidManufacturerCatalog', () => {
        const manufacturer = {
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
        expect(ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toBeTruthy();
    });

    test('isValidManufacturerCatalog: _id is empty', () => {
        const manufacturer = {
            _id: '',
            shortName: 'test',
            longName: 'test',
            description: 'test',
            url: 'https://example.com/',
            shortNameJa: 'test',
            longNameJa: 'test',
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
            description: 'test',
            url: 'https://example.com/',
            shortNameJa: 'test',
            longNameJa: 'test',
            descriptionJa: 'test',
            urlJa: 'https://example.com',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

    test('isValidManufacturerCatalog: shortName is not latin', () => {
        const manufacturer = {
            _id: 'test',
            shortName: 'テスト',
            longName: 'test',
            description: 'test',
            url: 'https://example.com/',
            shortNameJa: 'test',
            longNameJa: 'test',
            descriptionJa: 'test',
            urlJa: 'https://example.com',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

    test('isValidManufacturerCatalog: longName is not latin', () => {
        const manufacturer = {
            _id: 'test',
            shortName: 'test',
            longName: 'テスト',
            description: 'test',
            url: 'https://example.com/',
            shortNameJa: 'test',
            longNameJa: 'test',
            descriptionJa: 'test',
            urlJa: 'https://example.com',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

    test('isValidManufacturerCatalog: url does not start with http', () => {
        const manufacturer = {
            _id: 'test',
            shortName: 'test',
            longName: 'test',
            description: 'test',
            url: 'test',
            shortNameJa: 'test',
            longNameJa: 'test',
            descriptionJa: 'test',
            urlJa: 'https://example.com',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

    test('isValidManufacturerCatalog: urlJa does not start with http', () => {
        const manufacturer = {
            _id: 'test',
            shortName: 'test',
            longName: 'test',
            description: 'test',
            url: 'http://test',
            shortNameJa: 'test',
            longNameJa: 'test',
            descriptionJa: 'test',
            urlJa: 'test',
        };
        expect(() => ManufacturerCatalog.isValidManufacturerCatalog(manufacturer)).toThrow(TypeError);
    });

});