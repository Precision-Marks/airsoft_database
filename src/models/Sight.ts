export enum SightType {
    // NOTE: DO NOT change the following value. They are stored in database.
    UNKNOWN = 0,
    IRON = 1,
    DOT = 2,
    SCOPE = 4,
    LASER = 8,
    NONE = 16
}

export const sightTypesMask =
    SightType.IRON |
    SightType.DOT |
    SightType.SCOPE |
    SightType.LASER |
    SightType.NONE;