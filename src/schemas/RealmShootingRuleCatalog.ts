import Realm, { ObjectSchema } from "realm";
import { RealmDataConst } from "../models/RealmDataConst";

export class RealmShootingRuleCatalog extends Realm.Object<RealmShootingRuleCatalog> {
    _id!: number;
    type?: string;

    name!: string;
    description?: string;
    url?: string;

    nameJa?: string;
    descriptionJa?: string;
    urlJa?: string;

    /** Shooting range scaled by a factor of 100. Unit of the range is specified by `unitOfRange` */
    range100x!: number;
    /** Unit of shooting range. (UNIT_METER / UNIT_YARD). */
    unitOfRange!: number;

    virtualTargetName?: string;

    /** Available positions for this rule. bitmask of ShootingRule.Position.getValue(). 0 if any positions are available.  */
    positionsMask!: number;
    /** Available types of gun for this rule. bitmask of Gun.Type. 0 if any types of gun are available. */
    gunTypesMask!: number;
    /** Available type of sights for this rule. bitmask of Sight.Type. 0 if any types of sight are available */
    sightTypesMask!: number;
    /** Number of shots for one shooting stage */
    numOfShots!: number;
    /** Duration of this shooting stage in seconds */
    duration!: number;
    numOfStages!: number;
    /** Next shooting rule Id. 0 if none. */
    nextId!: number;

    static schema: ObjectSchema = {
        name: "RealmShootingRuleCatalog",
        properties: {
            _id: { type: "int", default: 0 },
            type: "string?",
            name: { type: "string", default: "" },
            description: "string?",
            url: "string?",
            nameJa: "string?",
            descriptionJa: "string?",
            urlJa: "string?",
            range100x: { type: "int", default: 0 },
            unitOfRange: { type: "int", default: RealmDataConst.UNIT_METER },
            virtualTargetName: "string?",
            positionsMask: { type: "int", default: 0 },
            gunTypesMask: { type: "int", default: 0 },
            sightTypesMask: { type: "int", default: 0 },
            numOfShots: { type: "int", default: 0 },
            duration: { type: "int", default: 0 },
            numOfStages: { type: "int", default: 0 },
            nextId: { type: "int", default: 0 },
        },
        primaryKey: "_id",
    };
}