import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { OptionValues } from "commander";
import { extractDdlStatementsFromSqldelight, writeDdlFile } from "./schemaDdl";
import * as ParseCSV from "../parseCSV";
import { IManufacturerCatalog } from "../models/ManufacturerCatalog";
import { IGunCatalog } from "../models/GunCatalog";
import { IShootingRuleCatalog } from "../models/ShootingRuleCatalog";
import { SCHEMA_VERSION } from "../models/RealmDataConst";
import { RealmManufacturerCatalog } from "../schemas/RealmManufacturerCatalog";
import { RealmGunCatalog } from "../schemas/RealmGunCatalog";
import { RealmShootingRuleCatalog } from "../schemas/RealmShootingRuleCatalog";

function getVersionFilename(dbFile: string): string {
  return `${dbFile}.commitid`;
}

function writeVersionFile(dbFile: string, commitId: string): void {
  const versionFilename = getVersionFilename(dbFile);
  fs.writeFileSync(versionFilename, commitId);
}

function openDatabase(filePath: string): Database.Database {
  const db = new Database(filePath);
  // Foreign keys are not required currently
  db.pragma("foreign_keys = OFF");
  return db;
}

function applyDdl(db: Database.Database, statements: string[]): void {
  db.exec("BEGIN TRANSACTION");
  try {
    for (const stmt of statements) {
      db.exec(stmt);
    }
    db.exec("COMMIT");
  } catch (e) {
    db.exec("ROLLBACK");
    throw e;
  }
}

function insertManufacturers(db: Database.Database, manufacturers: (IManufacturerCatalog | null)[]): void {
  const insert = db.prepare(
    `INSERT INTO manufacturers (id, shortName, longName, altName, description, url, shortNameJa, longNameJa, altNameJa, descriptionJa, urlJa)
     VALUES (@_id, @shortName, @longName, @altName, @description, @url, @shortNameJa, @longNameJa, @altNameJa, @descriptionJa, @urlJa)`
  );
  const tx = db.transaction((rows: (IManufacturerCatalog | null)[]) => {
    for (const row of rows) {
      if (row === null) continue;
      insert.run(row as any);
    }
  });
  tx(manufacturers);
}

function insertGuns(db: Database.Database, guns: (IGunCatalog | null)[]): void {
  const insert = db.prepare(
    `INSERT INTO guns (_id, manufacturerId, shortName, fullName, description, shortNameJa, fullNameJa, descriptionJa, type, powerSource, powerLevel, generic, deleted)
     VALUES (@_id, @manufacturerId, @shortName, @fullName, @description, @shortNameJa, @fullNameJa, @descriptionJa, @type, @powerSource, @powerLevel, @generic, @deleted)`
  );
  const tx = db.transaction((rows: (IGunCatalog | null)[]) => {
    for (const row of rows) {
      if (row === null) continue;
      const record: any = { ...row };
      if (typeof record.generic === "boolean") record.generic = record.generic ? 1 : 0;
      if (typeof record.deleted === "boolean") record.deleted = record.deleted ? 1 : 0;
      insert.run(record);
    }
  });
  tx(guns);
}

function insertShootingRules(db: Database.Database, rules: (IShootingRuleCatalog | null)[]): void {
  const insert = db.prepare(
    `INSERT INTO shooting_rules (_id, type, name, description, url, nameJa, descriptionJa, urlJa, range100x, unitOfRange, virtualTargetName, positionsMask, gunTypesMask, sightTypesMask, numOfShots, duration, numOfStages, nextId)
     VALUES (@_id, @type, @name, @description, @url, @nameJa, @descriptionJa, @urlJa, @range100x, @unitOfRange, @virtualTargetName, @positionsMask, @gunTypesMask, @sightTypesMask, @numOfShots, @duration, @numOfStages, @nextId)`
  );
  const tx = db.transaction((rows: (IShootingRuleCatalog | null)[]) => {
    for (const row of rows) {
      if (row === null) continue;
      insert.run(row as any);
    }
  });
  tx(rules);
}

function insertMetadata(db: Database.Database, commitId: string): void {
  const insert = db.prepare(
    `INSERT INTO catalog_metadata (_id, timestamp, commitId) VALUES (0, @timestamp, @commitId)`
  );
  insert.run({ timestamp: Date.now(), commitId });
}

export async function buildSqlite(options: OptionValues, directory: string): Promise<boolean> {
  const tempDir = path.normalize(`${__dirname}/../../temp_db/sqlite/`);
  const outputDir = path.normalize(`${__dirname}/../../db/sqlite/`);
  const ddlOutputDir = outputDir;

  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const tempDbFile = path.join(tempDir, "catalog_data.db");
  if (fs.existsSync(tempDbFile)) fs.rmSync(tempDbFile, { recursive: true, force: true });

  const ddlStatements = extractDdlStatementsFromSqldelight(path.normalize(`${__dirname}/../../sqldelight/catalog`));
  writeDdlFile(ddlOutputDir, ddlStatements, "catalog_schema.sql");

  const db = openDatabase(tempDbFile);
  try {
    applyDdl(db, ddlStatements);
    // Set user_version to the same schema version as Realm implementation
    db.pragma(`user_version = ${SCHEMA_VERSION}`);

    const manufacturers = ParseCSV.parseCsvFile(
      path.normalize(`${directory}ManufacturerCatalog.csv`),
      RealmManufacturerCatalog.schema as any
    );

    const guns = ParseCSV.parseCsvFile(
      path.normalize(`${directory}GunCatalog.csv`),
      RealmGunCatalog.schema as any
    );

    const shootingRules = ParseCSV.parseCsvFile(
      path.normalize(`${directory}ShootingRuleCatalog.csv`),
      RealmShootingRuleCatalog.schema as any
    );

    insertManufacturers(db, manufacturers as any);
    insertGuns(db, guns as any);
    insertShootingRules(db, shootingRules as any);
    insertMetadata(db, options.commit);
  } finally {
    db.close();
  }

  const finalDbFile = path.join(outputDir, "catalog_data.db");
  if (fs.existsSync(finalDbFile)) fs.unlinkSync(finalDbFile);
  fs.renameSync(tempDbFile, finalDbFile);

  if (!options.test) {
    writeVersionFile(finalDbFile, options.commit);
  }

  return true;
}


