export class RealmDataConst {
    /** Fixed point value scale factor */
    static readonly FP_SCALE_FACTOR = 100;
    static readonly UNIT_METER = 0;
    static readonly UNIT_YARD = 1;
    static readonly UNIT_FOOT = 2;
}

/**
 * Schema version for catalog database.
 * The version has no relation to the Realm/Sqlite3 schema version.
 * NOTE: This version should be the same with CATALOG_DATA_SCHEMA_VERSION in Airsoft Spotter app.
 */
export const SCHEMA_VERSION = 4;