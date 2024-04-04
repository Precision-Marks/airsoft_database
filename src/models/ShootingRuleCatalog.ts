import * as Utils from "../utils";
import { RealmDataConst } from "./RealmDataConst";
import { gunTypesMask } from "./GunCatalog";
import { sightTypesMask } from "./Sight";

export enum ShootingRulePosition{
    // NOTE: DO NOT change the following value. They are stored in database.
    UNKNOWN = 0,
    STANDING_ONE_HANDED = 1,
    STANDING_TWO_HANDED = 2,
    SITTING = 4,
    KNEELING = 8,
    PRONE = 16,
}

export const ShootingRulePositionMask = 
    ShootingRulePosition.STANDING_ONE_HANDED |
    ShootingRulePosition.STANDING_TWO_HANDED |
    ShootingRulePosition.SITTING |
    ShootingRulePosition.KNEELING |
    ShootingRulePosition.PRONE;

export interface IShootingRuleCatalog {
    _id: number;
    type?: string;

    name: string;
    description?: string;
    url?: string;

    nameJa?: string;
    descriptionJa?: string;
    urlJa?: string;

    /** Shooting range scaled by a factor of 100. Unit of the range is specified by `unitOfRange` */
    range100x: number;
    /** Unit of shooting range. (UNIT_METER / UNIT_YARD). */
    unitOfRange: number;

    virtualTargetName?: string;

    /** Available positions for this rule. bitmask of ShootingRule.Position.getValue(). 0 if any positions are available.  */
    positionsMask: number;
    /** Available types of gun for this rule. bitmask of Gun.Type. 0 if any types of gun are available. */
    gunTypesMask: number;
    /** Available type of sights for this rule. bitmask of Sight.Type. 0 if any types of sight are available */
    sightTypesMask: number;
    /** Number of shots for one shooting stage */
    numOfShots: number;
    /** Duration of this shooting stage in seconds */
    duration: number;
    numOfStages: number;
    /** Next shooting rule Id. 0 if none. */
    nextId: number;
};
    
export function isValidShootingRuleCatalog(rule: IShootingRuleCatalog): boolean {
    if (rule._id === undefined || rule._id === null || rule._id <= 0) {
        throw new TypeError(`Invalid shooting rule id: ${rule._id}`);
    }
    if (rule.name === undefined || rule.name === null || rule.name.length === 0) {
        throw new TypeError(`Invalid or empty shooting rule name: ${rule.name}`);
    }
    if (rule.range100x === undefined || rule.range100x === null || rule.range100x <= 0 || rule.range100x > 5000) {
        throw new TypeError(`Invalid shooting rule range: ${rule.range100x}`);
    }
    if (rule.unitOfRange === undefined || rule.unitOfRange === null || (rule.unitOfRange != RealmDataConst.UNIT_METER && rule.unitOfRange != RealmDataConst.UNIT_YARD)) {
        throw new TypeError(`Invalid shooting rule unit of range: ${rule.unitOfRange}`);
    }
    if (rule.positionsMask === undefined || rule.positionsMask === null || rule.positionsMask & ~ShootingRulePositionMask) {
        throw new TypeError(`Invalid shooting rule positions mask: ${rule.positionsMask}`);
    }
    if (rule.gunTypesMask === undefined || rule.gunTypesMask === null || rule.gunTypesMask & ~gunTypesMask) {
        throw new TypeError(`Invalid shooting rule gun types mask: ${rule.gunTypesMask}`);
    }
    if (rule.sightTypesMask === undefined || rule.sightTypesMask === null || rule.sightTypesMask & ~sightTypesMask) {
        throw new TypeError(`Invalid shooting rule sight types mask: ${rule.sightTypesMask}`);
    }
    if (rule.numOfShots === undefined || rule.numOfShots === null || rule.numOfShots <= 0 || rule.numOfShots > 10) {
        throw new TypeError(`Invalid shooting rule number of shots: ${rule.numOfShots}`);
    }
    if (rule.duration === undefined || rule.duration === null || rule.duration <= 0 || rule.duration > 600) {
        throw new TypeError(`Invalid shooting rule duration: ${rule.duration}`);
    }
    if (rule.numOfStages === undefined || rule.numOfStages === null || rule.numOfStages <= 0 || rule.numOfStages > 5) {
        throw new TypeError(`Invalid shooting rule number of stages: ${rule.numOfStages}`);
    }
    if (rule.nextId === undefined || rule.nextId === null || rule.nextId < 0) {
        throw new TypeError(`Invalid shooting rule next id: ${rule.nextId}`);
    }
    return true;
}