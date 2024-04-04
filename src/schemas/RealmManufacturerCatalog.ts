import Realm, { ObjectSchema } from "realm";
import { IManufacturerCatalog } from "../models/ManufacturerCatalog";

export class RealmManufacturerCatalog extends Realm.Object<RealmManufacturerCatalog> implements IManufacturerCatalog {
    _id!: string;
    shortName?: string;
    longName?: string;
    altName?: string;
    description?: string;
    url?: string;
    shortNameJa?: string;
    longNameJa?: string;
    altNameJa?: string;
    descriptionJa?: string;
    urlJa?: string;

    static readonly schema: ObjectSchema = {
        name: "RealmManufacturerCatalog",
        properties: {
            _id: { type: "string", default: "" },
            shortName: "string?",
            longName: "string?",
            altName: "string?",
            description: "string?",
            url: "string?",
            shortNameJa: "string?",
            longNameJa: "string?",
            altNameJa: "string?",
            descriptionJa: "string?",
            urlJa: "string?",
        },
        primaryKey: "_id",
    };
}