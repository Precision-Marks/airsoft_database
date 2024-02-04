import Realm, { ObjectSchema } from "realm";
import { ICatalogMetadata } from "../models/CatalogMetadata";

export class RealmCatalogMetadata extends Realm.Object<RealmCatalogMetadata> implements ICatalogMetadata {
    _id!: number;
    realmInstant!: Date;
    commitId!: string;

    static schema: ObjectSchema = {
        name: "RealmCatalogMetadata",
        properties: {
            _id: { type: "int", default: 0 },
            realmInstant: { type: "date", default: new Date() },
            commitId: "string",
        },
        primaryKey: "_id",
    };
}