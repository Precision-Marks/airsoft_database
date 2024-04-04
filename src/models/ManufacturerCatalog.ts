import * as Utils from "../utils";
import { gunIdRangeByManufacturer } from "./GunIdRange";

export const GENERIC_MANUFACTURER_ID = "other";
export const UNKNOWN_MANUFACTURER_ID = "unknown";

export interface IManufacturerCatalog {
    _id: string;
    shortName?: string;
    longName?: string;
    description?: string;
    url?: string;
    shortNameJa?: string;
    longNameJa?: string;
    descriptionJa?: string;
    urlJa?: string;
}

export function isValidManufacturerCatalog(manufacturer: IManufacturerCatalog): boolean {
    if (manufacturer._id === undefined || manufacturer._id === null || manufacturer._id.length === 0) {
        throw new TypeError(`Empty manufacturer id: ${manufacturer._id}`);
    }
    if (gunIdRangeByManufacturer[manufacturer._id] === undefined) {
        throw new TypeError(`Manufacturer id: "${manufacturer._id}" is not defined in GunIdRange.ts`);
    }
    if (! Utils.isPrintableAscii(manufacturer._id)) {
        throw new TypeError(`Invalid manufacturer id: ${manufacturer._id} (should contain alpha numeric only)`);
    }
    if (manufacturer.shortName != null && manufacturer.shortName.length === 0 && manufacturer._id !== UNKNOWN_MANUFACTURER_ID) {
        throw new TypeError(`Empty manufacturer short name for id: ${manufacturer._id}`);
    }
    if (manufacturer.shortName != null && manufacturer.shortName.length > 0 && ! Utils.isLatinOrGreek(manufacturer.shortName)) {
        throw new TypeError(`Invalid manufacturer short name: ${manufacturer.shortName} (contains non-latin characters)`);
    }
    if (manufacturer.longName != null && manufacturer.longName.length > 0 && ! Utils.isLatinOrGreek(manufacturer.longName)) {
        throw new TypeError(`Invalid manufacturer long name: ${manufacturer.longName} (contains non-latin characters)`);
    }
    if (manufacturer.url != null && ! manufacturer.url.startsWith("http")) {
        throw new TypeError(`Invalid manufacturer url: ${manufacturer.url} (must start with http)`);
    }
    if (manufacturer.urlJa != null && ! manufacturer.urlJa.startsWith("http")) {
        throw new TypeError(`Invalid manufacturer url (ja): ${manufacturer.urlJa} (must start with http)`);
    }
    return true;
}