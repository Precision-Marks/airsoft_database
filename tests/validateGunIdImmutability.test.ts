import fs from "fs";
import os from "os";
import path from "path";
import Database from "better-sqlite3";
import { IGunCatalog } from "../src/models/GunCatalog";
import { checkGunIdImmutability, isSameGunName, loadBaselineGuns } from "../src/validateGunIdImmutability";

const gun0: IGunCatalog = {
    _id: 10133,
    manufacturerId: "marui",
    shortName: "P-90",
    description: "Standard-Type series",
    shortNameJa: "P-90",
    descriptionJa: "電動ガンスタンダードタイプ",
    type: 2,
    powerSource: 2,
    powerLevel: 0,
};

const gun1: IGunCatalog = {
    _id: 10135,
    manufacturerId: "marui",
    shortName: "COLT M4A1 CARBINE",
    description: "Standard-Type series",
    shortNameJa: "コルト M4A1カービン",
    descriptionJa: "電動ガンスタンダードタイプ",
    type: 2,
    powerSource: 2,
    powerLevel: 0,
};

describe("isSameGunName", () => {
    test("identical names ignoring case, spaces, dashes and dots", () => {
        expect(isSameGunName("P-90", "p90")).toBe(true);
        expect(isSameGunName("MK46 MOD.0", "MK46 MOD 0")).toBe(true);
    });
    test("roman numerals and full-width characters", () => {
        expect(isSameGunName("FPR MK4 (EVOLT RS series)", "FPR Mk IV (EVOLT RS series)")).toBe(true);
        expect(isSameGunName("FPR MK4 (電動ガンエボルトRSシリーズ)", "FPR Mk Ⅳ (電動ガンエボルトRSシリーズ)")).toBe(true);
    });
    test("known series notation added or removed", () => {
        expect(isSameGunName("P-90+ (Plus series)", "P-90+")).toBe(true);
        expect(isSameGunName("P-90+ (電動ガンプラスシリーズ)", "P-90+")).toBe(true);
        expect(isSameGunName("MK46 MOD.0", "MK46 MOD.0 (Next generation series)")).toBe(true);
        expect(isSameGunName("マーク46 モッド0 (次世代電動ガン)", "マーク46 モッド0")).toBe(true);
    });
    test("series changed to another series", () => {
        expect(isSameGunName("M4A1 (Next generation series)", "M4A1 (Hicycle custom series)")).toBe(false);
        expect(isSameGunName("M4A1 (次世代電動ガン)", "M4A1 (電動ガンハイサイクルカスタム)")).toBe(false);
    });
    test("different model with the same series", () => {
        expect(isSameGunName("MK46 MOD.0 (Next generation series)", "HK417 (Next generation series)")).toBe(false);
        expect(isSameGunName("マーク46 モッド0 (次世代電動ガン)", "HK417 アーリーバリアント (次世代電動ガン)")).toBe(false);
    });
    test("different model number", () => {
        expect(isSameGunName("GLOCK19 Gen.4", "GLOCK17 Gen.4")).toBe(false);
        expect(isSameGunName("グロック19 Gen.4", "グロック17 Gen.4")).toBe(false);
        expect(isSameGunName("UPS MATCH", "USP MATCH")).toBe(false);
    });
    test("derivative model", () => {
        expect(isSameGunName("P-90", "P-90 TR")).toBe(false);
        expect(isSameGunName("USP", "USP COMPACT")).toBe(false);
        expect(isSameGunName("USP", "USPコンパクト")).toBe(false);
    });
    test("variant in parentheses other than series", () => {
        expect(isSameGunName("GLOCK17", "GLOCK17 (Fixed Slide)")).toBe(false);
        expect(isSameGunName("M4A1", "M4A1 (Short)")).toBe(false);
    });
});

describe("checkGunIdImmutability", () => {
    test("no changes", () => {
        const result = checkGunIdImmutability([gun0, gun1], [gun0, null, gun1]);
        expect(result.errors).toHaveLength(0);
        expect(result.warnings).toHaveLength(0);
    });

    test("new gun added", () => {
        const added: IGunCatalog = { ...gun1, _id: 10999, shortName: "New Gun", shortNameJa: "新しい銃" };
        const result = checkGunIdImmutability([gun0, gun1], [gun0, gun1, added]);
        expect(result.errors).toHaveLength(0);
        expect(result.warnings).toHaveLength(0);
    });

    test("gun removed", () => {
        const result = checkGunIdImmutability([gun0, gun1], [gun1]);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0]).toContain("Gun id 10133");
        expect(result.errors[0]).toContain("removed");
    });

    test("gun marked as deleted", () => {
        const result = checkGunIdImmutability([gun0, gun1], [{ ...gun0, deleted: true }, gun1]);
        expect(result.errors).toHaveLength(0);
        expect(result.warnings).toHaveLength(0);
    });

    test("manufacturerId changed", () => {
        const result = checkGunIdImmutability([gun0, gun1], [{ ...gun0, manufacturerId: "tanaka" }, gun1]);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0]).toContain("manufacturerId has changed");
        expect(result.errors[0]).toContain("line 2");
    });

    test("all names changed", () => {
        const reassigned: IGunCatalog = { ...gun1, shortName: "Totally New Gun", shortNameJa: "まったく新しい銃" };
        const result = checkGunIdImmutability([gun0, gun1], [gun0, reassigned]);
        expect(result.errors).toHaveLength(0);
        expect(result.warnings).toHaveLength(1);
        expect(result.warnings[0]).toContain("all names have changed");
        expect(result.warnings[0]).toContain("line 3");
    });

    test("only some names changed", () => {
        const renamed: IGunCatalog = { ...gun1, shortName: "Totally New Gun" };
        const result = checkGunIdImmutability([gun0, gun1], [gun0, renamed]);
        expect(result.errors).toHaveLength(0);
        expect(result.warnings).toHaveLength(0);
    });

    test("name added to an empty field", () => {
        const renamed: IGunCatalog = { ...gun1, fullName: "Totally New Gun" };
        const result = checkGunIdImmutability([gun0, gun1], [gun0, renamed]);
        expect(result.errors).toHaveLength(0);
        expect(result.warnings).toHaveLength(0);
    });

    test("type, powerSource and powerLevel changed", () => {
        const changed: IGunCatalog = { ...gun0, type: 8, powerSource: 4, powerLevel: 1 };
        const result = checkGunIdImmutability([gun0, gun1], [changed, gun1]);
        expect(result.errors).toHaveLength(0);
        expect(result.warnings).toHaveLength(3);
        expect(result.warnings[0]).toContain("type has changed from 2 to 8");
        expect(result.warnings[1]).toContain("powerSource has changed from 2 to 4");
        expect(result.warnings[2]).toContain("powerLevel has changed from 0 to 1");
    });

    test("deleted gun restored", () => {
        const result = checkGunIdImmutability([{ ...gun0, deleted: true }, gun1], [gun0, gun1]);
        expect(result.errors).toHaveLength(0);
        expect(result.warnings).toHaveLength(1);
        expect(result.warnings[0]).toContain("restored");
    });
});

describe("checkGunIdImmutability detects ids swapped between real models", () => {
    function gun(_id: number, shortName: string, shortNameJa: string, type: number, powerSource: number, description?: string, descriptionJa?: string): IGunCatalog {
        return { _id, manufacturerId: "marui", shortName, shortNameJa, description, descriptionJa, type, powerSource, powerLevel: 0 };
    }

    function swapIds(a: IGunCatalog, b: IGunCatalog): IGunCatalog[] {
        return [{ ...b, _id: a._id }, { ...a, _id: b._id }];
    }

    const pairs: [string, IGunCatalog, IGunCatalog][] = [
        ["GLOCK19 Gen.4 / GLOCK17 Gen.4", gun(10311, "GLOCK19 Gen.4", "グロック19 Gen.4", 1, 4), gun(10315, "GLOCK17 Gen.4", "グロック17 Gen.4", 1, 4)],
        ["P-90 / P-90 TR", gun(10133, "P-90", "P-90", 2, 2, "Standard-Type series", "電動ガンスタンダードタイプ"), gun(10145, "P-90 TR", "P-90 TR", 2, 2, "Standard-Type series", "電動ガンスタンダードタイプ")],
        ["USP / USP COMPACT", gun(10324, "USP", "USP", 1, 4), gun(10333, "USP COMPACT", "USPコンパクト", 1, 4)],
        ["MK46 MOD.0 / HK417 (Next generation series)", gun(10080, "MK46 MOD.0 (Next generation series)", "マーク46 モッド0 (次世代電動ガン)", 2, 2), gun(10081, "HK417 (Next generation series)", "HK417 アーリーバリアント (次世代電動ガン)", 2, 2)],
    ];

    test.each(pairs)("%s", (_name, a, b) => {
        const result = checkGunIdImmutability([a, b], swapIds(a, b));
        expect(result.errors).toHaveLength(0);
        expect(result.warnings).toHaveLength(2);
        expect(result.warnings[0]).toContain(`Gun id ${a._id}`);
        expect(result.warnings[0]).toContain("all names have changed");
        expect(result.warnings[1]).toContain(`Gun id ${b._id}`);
        expect(result.warnings[1]).toContain("all names have changed");
    });
});

describe("loadBaselineGuns", () => {
    let tempDir: string;

    beforeEach(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "airsoft-db-test-"));
    });

    afterEach(() => {
        fs.rmSync(tempDir, { recursive: true, force: true });
    });

    test("load guns from SQLite database", () => {
        const dbFile = path.join(tempDir, "catalog_data.db");
        const db = new Database(dbFile);
        db.exec(`CREATE TABLE guns(
            _id INTEGER NOT NULL PRIMARY KEY, manufacturerId TEXT NOT NULL, shortName TEXT NOT NULL,
            fullName TEXT, description TEXT, shortNameJa TEXT, fullNameJa TEXT, descriptionJa TEXT,
            type INTEGER NOT NULL, powerSource INTEGER NOT NULL, powerLevel INTEGER NOT NULL,
            generic INTEGER, deleted INTEGER)`);
        db.prepare(`INSERT INTO guns VALUES (10133, 'marui', 'P-90', NULL, 'Standard-Type series', 'P-90', NULL, NULL, 2, 2, 0, NULL, 1)`).run();
        db.close();

        const guns = loadBaselineGuns(dbFile);
        expect(guns).toHaveLength(1);
        expect(guns[0]).toEqual({
            _id: 10133,
            manufacturerId: "marui",
            shortName: "P-90",
            fullName: undefined,
            description: "Standard-Type series",
            shortNameJa: "P-90",
            fullNameJa: undefined,
            descriptionJa: undefined,
            type: 2,
            powerSource: 2,
            powerLevel: 0,
            generic: undefined,
            deleted: true,
        });
    });

    test("missing database file", () => {
        expect(() => loadBaselineGuns(path.join(tempDir, "missing.db"))).toThrow();
    });
});
