import * as Utils from './utils';
import { IManufacturerCatalog, isValidManufacturerCatalog } from './models/ManufacturerCatalog';

function checkDuplicate(a: IManufacturerCatalog, b: IManufacturerCatalog) {
    if (a._id === b._id) {
        throw new TypeError(`Duplicate manufacturer id: ${a._id}`);
    }

    if (Utils.isSameString(a.shortName, b.shortName)) {
        throw new TypeError(`Duplicate manufacturer shorName: ${a.shortName}`);
    }

    if (a.shortNameJa && Utils.isSameString(a.shortNameJa, b.shortNameJa)) {
        throw new TypeError(`Duplicate manufacturer shortNameJa: ${a.shortName}`);
    }

    if (a.longName && Utils.isSameString(a.longName, b.longName)) {
        throw new TypeError(`Duplicate manufacturer longName: ${a.longName}`);
    }

    if (a.longNameJa && Utils.isSameString(a.longNameJa, b.longNameJa)) {
        throw new TypeError(`Duplicate manufacturer longNameJa: ${a.longName}`);
    }
}

function isUnique(manufacturers: (IManufacturerCatalog | null)[]): boolean {
    for (let i = 0; i < manufacturers.length; i++) {
        if (manufacturers[i] == null) {
            continue;
        }
        for (let j = i + 1; j < manufacturers.length; j++) {
            if (manufacturers[j] == null) {
                continue;
            }
            try {
                checkDuplicate(manufacturers[i]!!, manufacturers[j]!!);
            } catch(e) {
                if (e instanceof TypeError) {
                    throw new TypeError(`Error at line ${i + 2} and ${j + 2}: ${e.message}`);
                } else {
                    throw new Error(`Exception at line ${i + 2} and ${j + 2}: ${JSON.stringify(e)}`);
                }
            }
        }
    }
    return true;
}

export function validateManufacturer(manufacturers: (IManufacturerCatalog | null)[]): boolean {
    manufacturers.forEach((manufacturer, index) => {
        if (manufacturer === null) {
            return;
        }
        try {
            isValidManufacturerCatalog(manufacturer);
        } catch (e) {
            if (e instanceof TypeError) {
                throw new TypeError(`Error at line ${index + 2}: ${e.message}`);
            } else {
                throw new Error(`Exception at line ${index + 2}: ${JSON.stringify(e)}`);
            }
        }
    });

    try {
        isUnique(manufacturers)
    } catch (e) {
        throw (e);
    }

    return true;
}