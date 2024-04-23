import * as ShootingRuleCatalog from '../../src/models/ShootingRuleCatalog';
import * as GunCatalog from '../../src/models/GunCatalog';
import * as Sight from '../../src/models/Sight';

describe('ShootingRuleCatalog test', () => {
    test('isValidShootingRuleCatalog', () => {
        const shootingRuleCatalog = {
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

        expect(ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toBeTruthy();
    });

    test('isValidShootingRuleCatalog: _id is minus', () => {
        const shootingRuleCatalog = {
            _id: -1,
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

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: name is empty', () => {
        const shootingRuleCatalog = {
            _id: 1,
            type: undefined,
            name: "",
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

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: range100x is minus', () => {
        const shootingRuleCatalog = {
            _id: 1,
            type: undefined,
            name: "5m Slow Fire Freestyle",
            description: "5m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.",
            url: undefined,
            nameJa: "5m 精密射撃 フリースタイル",
            descriptionJa: "5m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。",
            urlJa: undefined,
            range100x: -1,
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

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: range100x is zero', () => {
        const shootingRuleCatalog = {
            _id: 1,
            type: undefined,
            name: "5m Slow Fire Freestyle",
            description: "5m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.",
            url: undefined,
            nameJa: "5m 精密射撃 フリースタイル",
            descriptionJa: "5m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。",
            urlJa: undefined,
            range100x: 0,
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

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: range100x is over 5000', () => {
        const shootingRuleCatalog = {
            _id: 1,
            type: undefined,
            name: "5m Slow Fire Freestyle",
            description: "5m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.",
            url: undefined,
            nameJa: "5m 精密射撃 フリースタイル",
            descriptionJa: "5m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。",
            urlJa: undefined,
            range100x: 5001,
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

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: unitOfRange is minus', () => {
        const shootingRuleCatalog = {
            _id: 1,
            type: undefined,
            name: "5m Slow Fire Freestyle",
            description: "5m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.",
            url: undefined,
            nameJa: "5m 精密射撃 フリースタイル",
            descriptionJa: "5m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。",
            urlJa: undefined,
            range100x: 500,
            unitOfRange: -1,
            virtualTargetName: undefined,
            positionsMask: 0,
            gunTypesMask: 0,
            sightTypesMask: 0,
            numOfShots: 10,
            duration: 240,
            numOfStages: 1,
            nextId: 2,
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: unitOfRange is over 2', () => {
        const shootingRuleCatalog = {
            _id: 1,
            type: undefined,
            name: "5m Slow Fire Freestyle",
            description: "5m (5.47yds), 10 shots in 4min. Any type of guns, sights and firing positions are allowed.",
            url: undefined,
            nameJa: "5m 精密射撃 フリースタイル",
            descriptionJa: "5m, 10発/4分。銃の種類・サイト・射撃姿勢、いずれも制限なし。",
            urlJa: undefined,
            range100x: 500,
            unitOfRange: 3,
            virtualTargetName: undefined,
            positionsMask: 0,
            gunTypesMask: 0,
            sightTypesMask: 0,
            numOfShots: 10,
            duration: 240,
            numOfStages: 1,
            nextId: 2,
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: positionsMask is minus', () => {
        const shootingRuleCatalog = {
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
            positionsMask: -1,
            gunTypesMask: 0,
            sightTypesMask: 0,
            numOfShots: 10,
            duration: 240,
            numOfStages: 1,
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: positionsMask is over ShootingRulePositionMask', () => {
        const shootingRuleCatalog = {
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
            positionsMask: ShootingRuleCatalog.ShootingRulePositionMask + 1,
            gunTypesMask: 0,
            sightTypesMask: 0,
            numOfShots: 10,
            duration: 240,
            numOfStages: 1,
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: gunTypesMask is minus', () => {
        const shootingRuleCatalog = {
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
            gunTypesMask: -1, 
            sightTypesMask: 0, 
            numOfShots: 10, 
            duration: 240, 
            numOfStages: 1, 
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: gunTypesMask is over gunTypesMask', () => {
        const shootingRuleCatalog = {
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
            gunTypesMask: GunCatalog.gunTypesMask + 1, 
            sightTypesMask: 0, 
            numOfShots: 10, 
            duration: 240, 
            numOfStages: 1, 
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: sightTypesMask is minus', () => {
        const shootingRuleCatalog = {
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
            sightTypesMask: -1, 
            numOfShots: 10, 
            duration: 240, 
            numOfStages: 1, 
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: sightTypesMask is over sightTypesMask', () => {
        const shootingRuleCatalog = {
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
            sightTypesMask: Sight.sightTypesMask + 1, 
            numOfShots: 10, 
            duration: 240, 
            numOfStages: 1, 
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: numOfShots is minus', () => {
        const shootingRuleCatalog = {
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
            numOfShots: -1, 
            duration: 240, 
            numOfStages: 1, 
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: numOfShots is zero', () => {
        const shootingRuleCatalog = {
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
            numOfShots: 0, 
            duration: 240, 
            numOfStages: 1, 
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: numOfShots is over 10', () => {
        const shootingRuleCatalog = {
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
            numOfShots: 11, 
            duration: 240, 
            numOfStages: 1, 
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: duration is minus', () => {
        const shootingRuleCatalog = {
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
            duration: -1, 
            numOfStages: 1, 
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: duration is zero', () => {
        const shootingRuleCatalog = {
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
            duration: 0,
            numOfStages: 1,
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: duration is over 600', () => {
        const shootingRuleCatalog = {
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
            duration: 601, 
            numOfStages: 1, 
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: numOfStages is minus', () => {
        const shootingRuleCatalog = {
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
            numOfStages: -1,  
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: numOfStages is zero', () => {
        const shootingRuleCatalog = {
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
            numOfStages: 0,  
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: numOfStages is over 5', () => {
        const shootingRuleCatalog = {
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
            numOfStages: 6,  
            nextId: 2
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

    test('isValidShootingRuleCatalog: nextId is minus', () => {
        const shootingRuleCatalog = {
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
            nextId: -1
        };

        expect(() => ShootingRuleCatalog.isValidShootingRuleCatalog(shootingRuleCatalog)).toThrow(TypeError);
    });

});

