import Realm, { ObjectSchema } from "realm";
import { GENERIC_MANUFACTURER_ID } from "../models/ManufacturerCatalog";
import { IGunCatalog, GunPowerLevel, GunPowerSource, GunType } from "../models/GunCatalog";

export class RealmGunCatalog extends Realm.Object<RealmGunCatalog> implements IGunCatalog {
    _id!: number;
    manufacturerId!: string;
    shortName!: string;
    fullName?: string;
    description?: string;
    shortNameJa?: string;
    fullNameJa?: string;
    descriptionJa?: string;
    type!: number;
    powerSource!: number;
    // lowFps!: boolean;
    powerLevel!: number;
    /** If true the name of this gun is not unique */
    generic?: boolean;
    deleted?: boolean;

    static schema: ObjectSchema = {
        name: "RealmGunCatalog",
        properties: {
            _id: { type: "int", default: 0 },
            manufacturerId: { type: "string", default: GENERIC_MANUFACTURER_ID, indexed: true },
            shortName: { type: "string", default: "", indexed: true },
            fullName: "string?",
            description: "string?",
            shortNameJa: "string?",
            fullNameJa: "string?",
            descriptionJa: "string?",
            type: { type: "int", default: GunType.UNKNOWN, indexed: true },
            powerSource: { type: "int", default: GunPowerSource.UNKNOWN, indexed: true },
            // lowFps: { type: "bool", default: false, indexed: true },
            powerLevel: { type: "int", default: GunPowerLevel.UNKNOWN, indexed: true },
            generic: "bool?",
            deleted: "bool?",
        },
        primaryKey: "_id",
    };
}