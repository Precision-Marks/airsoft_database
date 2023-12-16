import Realm, { ObjectSchema } from "realm";

export class RealmManufacturerCatalog extends Realm.Object<RealmManufacturerCatalog> {
    _id!: string;
    shortName?: string;
    longName?: string;
    description?: string;
    url?: string;
    shortNameJa?: string;
    longNameJa?: string;
    descriptionJa?: string;
    urlJa?: string;

    static schema: ObjectSchema = {
        name: "RealmManufacturerCatalog",
        properties: {
            _id: { type: "string", default: "" },
            shortName: "string?",
            longName: "string?",
            description: "string?",
            url: "string?",
            shortNameJa: "string?",
            longNameJa: "string?",
            descriptionJa: "string?",
            urlJa: "string?",
        },
        primaryKey: "_id",
    };
}