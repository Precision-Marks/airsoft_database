# Gun Catalog CSV Schema

This document describes the schema for the `source_data/RealmGunCatalog.csv` file.

The CSV file contains information about various airsoft gun models. Each row represents a single gun model. The first row of the CSV file contains the header, defining the fields for each subsequent row.

## Fields

The following fields correspond to the `IGunCatalog` interface in `src/models/GunCatalog.ts`.

* **`_id`**: (Number) A unique, immutable identifier for the gun model. **Mandatory**. Must be a non-negative integer. See `src/models/GunIdRange.ts` for manufacturer-specific ID ranges. Generic guns (see `generic` field) must have an ID less than 10000. **NOTE**: Once assigned, this ID must never be deleted or reassigned to a different gun model. Note that the `npm run test-database` command does not check for this constraint.

* **`manufacturerId`**: (String) The unique identifier of the manufacturer, corresponding to the `_id` field in `RealmManufacturerCatalog.csv`. **Mandatory**. Must contain only printable ASCII characters. Cannot be `unknown` if `generic` is true.
* **`shortName`**: (String) A short, commonly used name for the gun model (e.g., "M4A1", "G17"). **Mandatory**. Must contain only Latin or Greek characters.
* **`fullName`**: (String) The full official name of the gun model. **Optional**. If provided, must contain only Latin or Greek characters.
* **`description`**: (String) A brief description of the gun model. **Optional**.
* **`shortNameJa`**: (String) The short name of the gun model in Japanese. **Optional**. Cannot contain full-width parentheses `（` or `）`. Please use half-width parentheses `(` and `)` instead if needed.
* **`fullNameJa`**: (String) The full name of the gun model in Japanese. **Optional**. Cannot contain full-width parentheses `（` or `）`. Please use half-width parentheses `(` and `)` instead if needed.
* **`descriptionJa`**: (String) A brief description of the gun model in Japanese. **Optional**.
* **`type`**: (Number) The type of the gun. **Mandatory**. See [Gun Types](#gun-types) section below for possible values.
* **`powerSource`**: (Number) The power source of the gun. **Mandatory**. See [Power Sources](#power-sources) section below for possible values.
* **`powerLevel`**: (Number) Indicates the power level, primarily for Japanese regulations. **Mandatory**. See [Power Levels](#power-levels) section below for possible values.
* **`generic`**: (Boolean) If `true`, indicates this entry represents a general category or placeholder for guns from the specified `manufacturerId` that do not have a more specific entry in the catalog (e.g., "Other Tokyo Marui Handgun"). If `false` or omitted, it represents a specific model variant. **Optional** (defaults to `false` if omitted). An entry cannot be both `generic: true` and have `manufacturerId: 'unknown'` simultaneously.
* **`deleted`**: (Boolean) If `true`, marks the entry as deleted or obsolete. **Optional** (defaults to `false` if omitted).

## Enum Value Details

### Gun Types

Corresponds to the `GunType` enum in `src/models/GunCatalog.ts`.

* `1`: Handgun
* `2`: Rifle or Machine Gun
* `4`: Shotgun
* `8`: SMG or PDW
* `16`: Other

### Power Sources

Corresponds to the `GunPowerSource` enum in `src/models/GunCatalog.ts`.

* `1`: Spring (Manual cocking)
* `2`: Battery (AEG, AEP)
* `4`: GAS (GBB, NBB, CO2)

### Power Levels

Corresponds to the `GunPowerLevel` enum in `src/models/GunCatalog.ts`.

* `0`: Normal (Represents standard power level or classification not applicable/unknown)
* `1`: LOW (Significantly below standard limits, typically for BB energy under 0.5 Joules, e.g., for children)
* `2`: R10+ JPN (Suitable for ages 10+ under Japanese regulations)
* `3`: R14+ JPN (Suitable for ages 14+ under Japanese regulations)

## Character Encoding

The file should be encoded in UTF-8 to support characters from different languages.
