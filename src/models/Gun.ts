export enum GunType {
    // NOTE: DO NOT change the following value. They are stored in database.
    UNKNOWN = 0,
    HANDGUN = 1,
    RIFLE = 2,
    SHOTGUN = 4,
    SMG = 8,
    OTHER = 16
}

export enum GunPowerSource {
    // NOTE: DO NOT change the following value. They are stored in database.
    UNKNOWN = 0,
    SPRING = 1,
    BATTERY = 2,
    GAS = 4
}