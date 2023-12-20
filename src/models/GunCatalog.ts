import * as Utils from "../utils";

export enum GunType {
    // NOTE: DO NOT change the following value. They are stored in database.
    UNKNOWN = 0,
    HANDGUN = 1,
    RIFLE = 2,
    SHOTGUN = 4,
    SMG = 8,
    OTHER = 16
}

export const gunTypesMask =
    GunType.HANDGUN |
    GunType.RIFLE |
    GunType.SHOTGUN |
    GunType.SMG |
    GunType.OTHER;

export enum GunPowerSource {
    // NOTE: DO NOT change the following value. They are stored in database.
    UNKNOWN = 0,
    SPRING = 1,
    BATTERY = 2,
    GAS = 4
}

export const GunPowerSourceMask =
    GunPowerSource.SPRING |
    GunPowerSource.BATTERY |
    GunPowerSource.GAS;

export interface IGunCatalog {
    _id: number;
    manufacturerId: string;
    shortName: string;
    fullName?: string;
    description?: string;
    shortNameJa?: string;
    fullNameJa?: string;
    descriptionJa?: string;
    type: number;
    powerSource: number;
    lowFps: boolean;
    /** If true the name of this gun is not unique */
    generic?: boolean;
    deleted?: boolean;
}

export function isValidGunCatalog(gun: IGunCatalog): boolean {
    if (gun._id === undefined || gun._id === null || gun._id < 0) {
        throw new TypeError(`Invalid gun id: ${gun._id}`);
    }
    if (gun.manufacturerId === undefined || gun.manufacturerId === null || gun.manufacturerId.length === 0 || !Utils.isPrintableAscii(gun.manufacturerId)) {
        throw new TypeError(`Invalid or empty gun manufacturer id: ${gun.manufacturerId} (should contain printable ASCII only)`)
    }
    if (gun.shortName === undefined || gun.shortName === null || gun.shortName.length == 0 || !Utils.isLatinOrGreek(gun.shortName)) {
        throw new TypeError(`Invalid or empty gun short name: "${gun.shortName}"`);
    }
    if (! Utils.isLatinOrGreek(gun.shortName)) {
        throw new TypeError(`Invalid gun short name: ${gun.shortName} (contains non-latin characters)`);
    }
    if (gun.fullName != null && gun.fullName.length > 0 && !Utils.isLatinOrGreek(gun.fullName)) {
        throw new TypeError(`Invalid gun full name: ${gun.fullName} (contains non-latin characters)`);
    }
    if (gun.shortNameJa != null && /[（）]/.test(gun.shortNameJa)) {
        throw new TypeError(`Invalid gun short name (ja): ${gun.shortNameJa} (contains full width '（' or '）')`);
    }
    if (gun.fullNameJa != null && /[（）]/.test(gun.fullNameJa)) {
        throw new TypeError(`Invalid gun full name (ja): ${gun.fullNameJa} (contains full width '（' or '）')`);
    }
    if (GunType[gun.type] === undefined) {
        throw new TypeError(`Invalid gun type: ${gun.type}`);
    }
    if (GunPowerSource[gun.powerSource] === undefined) {
        throw new TypeError(`Invalid gun power source: ${gun.powerSource}`);
    }
    if (gun.lowFps === undefined || gun.lowFps === null) {
        return false;
    }
    return true;
}