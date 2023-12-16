import Realm, { ObjectSchema } from "realm";
import { Manufacturer } from "../models/Manufacturer";
import { GunPowerSource, GunType } from "../models/Gun";

export class RealmGunCatalog extends Realm.Object<RealmGunCatalog> {
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
    lowFps!: boolean;
    /** If true the name of this gun is not unique */
    generic?: boolean;
    deleted?: boolean;

    static schema: ObjectSchema = {
        name: "RealmGunCatalog",
        properties: {
            _id: { type: "int", default: 0 },
            manufacturerId: { type: "string", default: Manufacturer.GENERIC_MANUFACTURER_ID, indexed: true },
            shortName: { type: "string", default: "", indexed: true },
            fullName: "string?",
            description: "string?",
            shortNameJa: "string?",
            fullNameJa: "string?",
            descriptionJa: "string?",
            type: { type: "int", default: GunType.UNKNOWN, indexed: true },
            powerSource: { type: "int", default: GunPowerSource.UNKNOWN, indexed: true },
            lowFps: { type: "bool", default: false, indexed: true },
            generic: "bool?",
            deleted: "bool?",
        },
        primaryKey: "_id",
    };
}