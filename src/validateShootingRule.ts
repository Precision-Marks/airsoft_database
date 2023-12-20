import * as Utils from "./utils";
import { IShootingRuleCatalog, isValidShootingRuleCatalog } from "./models/ShootingRuleCatalog";

function checkDuplicate(a: IShootingRuleCatalog, b: IShootingRuleCatalog) {
    if (a._id === b._id) {
        throw new TypeError(`Duplicate shooting rule id: ${a._id}`);
    }

    if (Utils.isSameString(a.name, b.name)) {
        throw new TypeError(`Duplicate shooting rule name: ${a.name}`);
    }

    if (Utils.isSameString(a.nameJa, b.nameJa)) {
        throw new TypeError(`Duplicate shooting rule nameJa: ${a.nameJa}`);
    }
}

function isUnique(rules: (IShootingRuleCatalog | null)[]): boolean {
    for (let i = 0; i < rules.length; i++) {
        if (rules[i] == null) {
            continue;
        }
        for (let j = i + 1; j < rules.length; j++) {
            if (rules[j] == null) {
                continue;
            }
            try {
                checkDuplicate(rules[i]!!, rules[j]!!);
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

export function validateShootingRule(rules: (IShootingRuleCatalog | null)[]): boolean {
    rules.forEach((rule, index) => {
        if (rule === null) {
            return;
        }
        try {
            isValidShootingRuleCatalog(rule);
        } catch (e) {
            if (e instanceof TypeError) {
                throw new TypeError(`Error at line ${index + 2}: ${e.message}`);
            } else {
                throw new Error(`Exception at line ${index + 2}: ${JSON.stringify(e)}`);
            }
        }
    });

    try {
        isUnique(rules);
    } catch(e) {
        throw e;
    }

    return true;
}