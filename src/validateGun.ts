import * as Utils from "./utils";
import { IGunCatalog, isValidGunCatalog } from "./models/GunCatalog";

function checkDuplicate(guns: (IGunCatalog | null)[], i: number, j: number) {
    const a = guns[i]!!;
    const b = guns[j]!!;

    if (a._id === b._id) {
        throw new TypeError(`Duplicated gun id: ${a._id} at line ${i + 2} and ${j + 2}`);
    }

    // Check duplicate shortName
    if (Utils.compareInstances<IGunCatalog>(a, b, ["manufacturerId", "shortName", "type", "powerSource", "lowFps", "deleted"])) {
        if (Utils.fuzzyStringCompare(a.description ?? "", b.description ?? "")) {
            throw new TypeError(`Duplicate gun defined (shortName: "${a.shortName}") at line ${i + 2} and ${j + 2}`);
        } else {
            console.log(`Warning: Gun definition may be duplicated (shortName: "${a.shortName}") at line ${i + 2} and ${j + 2}`);
        }
    }

    // Check duplicate shortNameJa if exists
    if ((a.shortNameJa?.length ?? 0) > 0 &&  Utils.compareInstances<IGunCatalog>(a, b, ["manufacturerId", "shortNameJa", "type", "powerSource", "lowFps", "deleted"])) {
        if (Utils.fuzzyStringCompare(a.description ?? "", b.description ?? "")) {
            throw new TypeError(`Duplicate gun defined (shortNameJa: "${a.shortNameJa}") at line ${i + 2} and ${j + 2}`);
        } else {
            console.log(`Warning: Gun definition may be duplicated (shortNameJa: "${a.shortNameJa}") at line ${i + 2} and ${j + 2}`);
        }
    }

    // Check duplicate fullName if exists
    if ((a.fullName?.length ?? 0) > 0 && Utils.compareInstances<IGunCatalog>(a, b, ["manufacturerId", "fullName", "type", "powerSource", "lowFps", "deleted"])) {
        if (Utils.fuzzyStringCompare(a.description ?? "", b.description ?? "")) {
            throw new TypeError(`Duplicate gun defined (fullName: "${a.fullName}") at line ${i + 2} and ${j + 2}`);
        } else {
            console.log(`Warning: Gun definition may be duplicated (fullName: "${a.fullName}") at line ${i + 2} and ${j + 2}`);
        }
    }

    // Check duplicate fullNameJa if exists
    if ((a.fullNameJa?.length ?? 0) > 0 && Utils.compareInstances<IGunCatalog>(a, b, ["manufacturerId", "fullNameJa", "type", "powerSource", "lowFps", "deleted"])) {
        if (Utils.fuzzyStringCompare(a.description ?? "", b.description ?? "")) {
            throw new TypeError(`Duplicate gun defined (fullNameJa: "${a.fullNameJa}") at line ${i + 2} and ${j + 2}`);
        } else {
            console.log(`Warning: Gun definition may be duplicated (fullNameJa: "${a.fullNameJa}") at line ${i + 2} and ${j + 2}`);
        }
    }
}

function isUnique(guns: (IGunCatalog | null)[]): boolean {
    for (let i = 0; i < guns.length; i++) {
        if (guns[i] == null) {
            continue;
        }
        for (let j = i + 1; j < guns.length; j++) {
            if (guns[j] == null) {
                continue;
            }
            try {
                checkDuplicate(guns, i, j);
            } catch(e) {
                if (e instanceof TypeError) {
                    throw new TypeError(`Error at line ${i + 2} and ${j + 2}: ${e.message}`);
                } else {
                    throw new Error(`Exception at line ${i + 2} and ${j + 2}: ${JSON.stringify(e)}`);
                }
            }
        }
    }
    return true;
}

/**
 * Validate gun catalog
 * @param guns List of gun catalog to validate
 * @param manufacturers List of manufacturer ids available in the database. If null, manufacturer id is not checked. 
 * @returns true if validation is successful
 */
export function validateGun(guns: (IGunCatalog | null)[], manufacturers: string[] | null): boolean {
    guns.forEach((gun, index) => {
        if (gun === null) {
            return;
        }

        if (manufacturers != null && manufacturers.indexOf(gun.manufacturerId) < 0) {
            throw new TypeError(`Invalid manufacturer id: "${gun.manufacturerId}" at line ${index + 2}`);
        }

        try {
            isValidGunCatalog(gun);
        } catch (e) {
            if (e instanceof TypeError) {
                throw new TypeError(`Error at line ${index + 2}: ${e.message}`);
            } else {
                throw new TypeError(`Exception at line ${index + 2}: ${JSON.stringify(e)}`);
            }
        }
    });

    try {
        isUnique(guns)
    } catch (e) {
        throw (e);
    }

    return true;
}