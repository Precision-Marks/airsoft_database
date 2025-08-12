-- Auto-generated from sqldelight .sq files
-- Do not edit manually.

CREATE TABLE catalog_metadata(
  _id INTEGER NOT NULL PRIMARY KEY,
  timestamp INTEGER NOT NULL,
  commitId TEXT NOT NULL
);

CREATE TABLE guns(
  _id INTEGER NOT NULL PRIMARY KEY,
  manufacturerId TEXT NOT NULL,
  shortName TEXT NOT NULL,
  fullName TEXT,
  description TEXT,
  shortNameJa TEXT,
  fullNameJa TEXT,
  descriptionJa TEXT,
  type INTEGER NOT NULL,
  powerSource INTEGER NOT NULL,
  powerLevel INTEGER NOT NULL,
  generic INTEGER,
  deleted INTEGER
);

CREATE INDEX IF NOT EXISTS guns_manufacturerId_idx ON guns(manufacturerId);

CREATE TABLE manufacturers(
  id TEXT NOT NULL PRIMARY KEY,
  shortName TEXT,
  longName TEXT,
  altName TEXT,
  description TEXT,
  url TEXT,
  shortNameJa TEXT,
  longNameJa TEXT,
  altNameJa TEXT,
  descriptionJa TEXT,
  urlJa TEXT
);

CREATE TABLE shooting_rules(
  _id INTEGER NOT NULL PRIMARY KEY,
  type TEXT,
  name TEXT NOT NULL,
  description TEXT,
  url TEXT,
  nameJa TEXT,
  descriptionJa TEXT,
  urlJa TEXT,
  range100x INTEGER NOT NULL,
  unitOfRange INTEGER NOT NULL,
  virtualTargetName TEXT,
  positionsMask INTEGER NOT NULL,
  gunTypesMask INTEGER NOT NULL,
  sightTypesMask INTEGER NOT NULL,
  numOfShots INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  numOfStages INTEGER NOT NULL,
  nextId INTEGER NOT NULL
);
