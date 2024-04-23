import { IShootingRuleCatalog } from "../src/models/ShootingRuleCatalog";
import { validateShootingRule } from "../src/validateShootingRule";

const shootingRule0: IShootingRuleCatalog = {
    _id: 1,
    type: undefined,
    name: "5m Slow Fire Freestyle",
    description: "5m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.",
    url: undefined,
    nameJa: "5m 精密射撃 フリースタイル",
    descriptionJa: "5m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。",
    urlJa: undefined,
    range100x: 500,
    unitOfRange: 0,
    virtualTargetName: undefined,
    positionsMask: 0,
    gunTypesMask: 0,
    sightTypesMask: 0,
    numOfShots: 10,
    duration: 240,
    numOfStages: 1,
    nextId: 2,
};

const shootingRule1: IShootingRuleCatalog = { // Has duplicate id with shootingRule0
    _id: 1,
    type: undefined,
    name: "5m Slow Fire Freestyle",
    description: "5m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.",
    url: undefined,
    nameJa: "5m 精密射撃 フリースタイル",
    descriptionJa: "5m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。",
    urlJa: undefined,
    range100x: 500,
    unitOfRange: 0,
    virtualTargetName: undefined,
    positionsMask: 0,
    gunTypesMask: 0,
    sightTypesMask: 0,
    numOfShots: 10,
    duration: 240,
    numOfStages: 1,
    nextId: 2,
};

// Has duplicate name with shootingRule0
const shootingRule2: IShootingRuleCatalog = {
    _id: 2,
    type: undefined,
    name: "5m Slow Fire Freestyle",
    description: "5m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.",
    url: undefined,
    nameJa: "5m 精密射撃 フリースタイル",
    descriptionJa: "5m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。",
    urlJa: undefined,
    range100x: 500,
    unitOfRange: 0,
    virtualTargetName: undefined,
    positionsMask: 0,
    gunTypesMask: 0,
    sightTypesMask: 0,
    numOfShots: 10,
    duration: 240,
    numOfStages: 1,
    nextId: 2,
};

// Has duplicate nameJa with shootingRule0
const shootingRule3: IShootingRuleCatalog = {
    _id: 3,
    type: undefined,
    name: "10m Slow Fire Freestyle", // Unique name
    description: "5m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.",
    url: undefined,
    nameJa: "5m 精密射撃 フリースタイル",
    descriptionJa: "5m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。",
    urlJa: undefined,
    range100x: 500,
    unitOfRange: 0,
    virtualTargetName: undefined,
    positionsMask: 0,
    gunTypesMask: 0,
    sightTypesMask: 0,
    numOfShots: 10,
    duration: 240,
    numOfStages: 1,
    nextId: 2,
};

// Completely different shooting rule from shootingRule0
const shootingRule4: IShootingRuleCatalog = {
    _id: 4,
    type: undefined,
    name: "15m Slow Fire Freestyle",
    description: "15m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.",
    url: undefined,
    nameJa: "15m 精密射撃 フリースタイル",
    descriptionJa: "15m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。",
    urlJa: undefined,
    range100x: 500,
    unitOfRange: 0,
    virtualTargetName: undefined,
    positionsMask: 0,
    gunTypesMask: 0,
    sightTypesMask: 0,
    numOfShots: 10,
    duration: 240,
    numOfStages: 1,
    nextId: 2,
};


describe("validateShootingRule() tests", () => {
    test("validateShootingRule() should success", () => {
        expect(validateShootingRule([shootingRule0, null, null, shootingRule4])).toBe(true);
    });

    test("validateShootingRule() should fail with duplicate id", () => {
        expect(() => validateShootingRule([shootingRule0, null, null, shootingRule1])).toThrow(TypeError);
    });

    test("validateShootingRule() should fail with duplicate name", () => {
        expect(() => validateShootingRule([shootingRule0, null, null, shootingRule2])).toThrow(TypeError);
    });

    test("validateShootingRule() should fail with duplicate nameJa", () => {
        expect(() => validateShootingRule([shootingRule0, null, null, shootingRule3])).toThrow(TypeError);
    });
});
