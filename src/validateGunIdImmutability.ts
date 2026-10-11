import Database from "better-sqlite3";
import { IGunCatalog } from "./models/GunCatalog";

export interface GunIdImmutabilityResult {
    errors: string[];
    warnings: string[];
}

// Name fields used to judge whether an id still points to the same gun
const NAME_FIELDS: (keyof IGunCatalog)[] = ["shortName", "shortNameJa", "fullName", "fullNameJa"];

// Fields that may be corrected, but a change is worth a review
const ATTRIBUTE_FIELDS: (keyof IGunCatalog)[] = ["type", "powerSource", "powerLevel"];

function isEmpty(value?: string): boolean {
    return value == null || value.length === 0;
}

// Known series notations written in parentheses, e.g. "(Next generation series)", "(次世代電動ガン)", "(電動ガンプラスシリーズ)".
// Other parenthesized notes such as "(Fixed Slide)" or "(A1)" distinguish variants and are kept as part of the name.
const SERIES_NOTATION_PATTERNS: RegExp[] = [/series$/i, /シリーズ$/, /^(次世代)?電動ガン/];

// Roman numerals written as a separate word, e.g. "Mk IV" is the same as "MK4"
const ROMAN_NUMERALS: { [roman: string]: string } = {
    i: "1", ii: "2", iii: "3", iv: "4", v: "5", vi: "6",
    vii: "7", viii: "8", ix: "9", x: "10", xi: "11", xii: "12",
};

function normalizeName(str: string): string {
    return str
        .toLowerCase() // case insensitive
        .split(/[-\s.]+/) // Remove spaces, dashes and dots
        .map(word => ROMAN_NUMERALS[word] ?? word)
        .join("");
}

/**
 * Split a name into the base name and the known series notation, both normalized.
 */
function parseName(name: string): { base: string, series?: string } {
    let series: string | undefined;
    // NFKC converts full-width characters and "Ⅳ" to "IV"
    const base = name.normalize("NFKC").replace(/\(([^)]*)\)/g, (match, content: string) => {
        if (SERIES_NOTATION_PATTERNS.some(pattern => pattern.test(content.trim()))) {
            series = normalizeName(content);
            return " ";
        }
        return match;
    });
    return { base: normalizeName(base), series };
}

/**
 * Check if two names refer to the same gun.
 * Ignores case, spaces, dashes, dots, full-width/half-width and roman/arabic numeral differences.
 * A known series notation may be added or removed, but must not be changed to another series.
 * Any other difference, such as a model number or a variant name, is treated as a different gun.
 */
export function isSameGunName(a: string, b: string): boolean {
    const pa = parseName(a);
    const pb = parseName(b);
    if (pa.base !== pb.base) {
        return false;
    }
    return pa.series === undefined || pb.series === undefined || pa.series === pb.series;
}

/**
 * Load the gun catalog from a released SQLite database to use as a baseline.
 * @param dbFile Path to the SQLite database file (e.g. db/sqlite/catalog_data.db)
 * @returns List of guns stored in the database
 */
export function loadBaselineGuns(dbFile: string): IGunCatalog[] {
    const db = new Database(dbFile, { readonly: true, fileMustExist: true });
    try {
        const rows = db.prepare(
            `SELECT _id, manufacturerId, shortName, fullName, description, shortNameJa, fullNameJa, descriptionJa, type, powerSource, powerLevel, generic, deleted
             FROM guns`
        ).all() as any[];

        return rows.map(row => ({
            _id: row._id,
            manufacturerId: row.manufacturerId,
            shortName: row.shortName,
            fullName: row.fullName ?? undefined,
            description: row.description ?? undefined,
            shortNameJa: row.shortNameJa ?? undefined,
            fullNameJa: row.fullNameJa ?? undefined,
            descriptionJa: row.descriptionJa ?? undefined,
            type: row.type,
            powerSource: row.powerSource,
            powerLevel: row.powerLevel,
            generic: row.generic == null ? undefined : row.generic !== 0,
            deleted: row.deleted == null ? undefined : row.deleted !== 0,
        }));
    } finally {
        db.close();
    }
}

/**
 * Check that gun ids already assigned in the baseline are neither removed nor reassigned to a different gun.
 * - Error: an id in the baseline is missing from the current catalog (use `deleted` instead of removing the row)
 * - Error: manufacturerId of an id has changed
 * - Warning: none of the name fields match the baseline (possible reassignment)
 * - Warning: type, powerSource or powerLevel has changed
 * - Warning: a deleted gun has been restored
 * @param baseline List of guns already released
 * @param current List of guns parsed from the CSV file (null for empty lines)
 * @returns Errors and warnings found
 */
export function checkGunIdImmutability(baseline: IGunCatalog[], current: (IGunCatalog | null)[]): GunIdImmutabilityResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Map gun id to its line number (index + 2) in the CSV file
    const currentById = new Map<number, { gun: IGunCatalog, line: number }>();
    current.forEach((gun, index) => {
        if (gun !== null) {
            currentById.set(gun._id, { gun, line: index + 2 });
        }
    });

    for (const base of baseline) {
        const entry = currentById.get(base._id);
        if (entry === undefined) {
            errors.push(`Gun id ${base._id} ("${base.shortName}") has been removed. Set deleted to true instead of removing the row.`);
            continue;
        }

        const { gun, line } = entry;

        if (gun.manufacturerId !== base.manufacturerId) {
            errors.push(`Gun id ${base._id} at line ${line}: manufacturerId has changed from "${base.manufacturerId}" to "${gun.manufacturerId}". Assign a new id instead.`);
            continue;
        }

        // Compare only name fields that are not empty in both
        const comparableNames = NAME_FIELDS.filter(field => !isEmpty(base[field] as string) && !isEmpty(gun[field] as string));
        if (comparableNames.length > 0
            && !comparableNames.some(field => isSameGunName(base[field] as string, gun[field] as string))) {
            warnings.push(`Gun id ${base._id} at line ${line}: all names have changed (shortName: "${base.shortName}" -> "${gun.shortName}"). It may be reassigned to a different gun.`);
        }

        for (const field of ATTRIBUTE_FIELDS) {
            if (gun[field] !== base[field]) {
                warnings.push(`Gun id ${base._id} ("${gun.shortName}") at line ${line}: ${field} has changed from ${base[field]} to ${gun[field]}.`);
            }
        }

        if (base.deleted === true && gun.deleted !== true) {
            warnings.push(`Gun id ${base._id} ("${gun.shortName}") at line ${line}: deleted gun has been restored.`);
        }
    }

    return { errors, warnings };
}
