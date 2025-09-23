# Shooting Rule Catalog CSV Schema

This document describes the schema for the `source_data/ShootingRuleCatalog.csv` file.

The CSV file defines shooting rules used in the app. Each row represents a single rule. The first row contains the header that defines the fields for subsequent rows.

## Fields

The following fields correspond to the `IShootingRuleCatalog` interface in `src/models/ShootingRuleCatalog.ts`.

* **`_id`**: (Number) A unique, immutable identifier for the rule. **Mandatory**. Must be a positive integer (> 0). Once assigned, this ID must never be deleted or reassigned to a different rule.

* **`type`**: (String) A classification key for the rule family (e.g., `nra`, `nra_onestring`). **Optional**.

* **`name`**: (String) Rule name in English. **Mandatory**. Must be unique across the file (case-insensitive, trimmed).
* **`description`**: (String) Description of the rule in English. **Optional**.
* **`url`**: (String) Link to a reference or documentation page. **Optional**.

* **`nameJa`**: (String) Rule name in Japanese. **Optional**. If provided, must be unique across the file (case-insensitive, trimmed).
* **`descriptionJa`**: (String) Description of the rule in Japanese. **Optional**.
* **`urlJa`**: (String) Link to a Japanese reference page. **Optional**.

* **`range100x`**: (Number) Shooting distance scaled by 100. **Mandatory**. The actual distance equals `range100x / 100`, with the unit specified by `unitOfRange`. Valid range is `1`–`5000`.
* **`unitOfRange`**: (Number) Unit of the distance. **Mandatory**. See [Unit of Range](#unit-of-range) for possible values.

* **`virtualTargetName`**: (String) Identifier of the target asset or preset (e.g., `nra_b6`, `nra_b8`). **Optional**.

* **`positionsMask`**: (Number) Allowed shooting positions as a bitmask of [Shooting Rule Positions](#shooting-rule-positions). **Mandatory**. Use `0` to mean “no restriction (any position allowed)”.
* **`gunTypesMask`**: (Number) Allowed gun types as a bitmask of [Gun Types](#gun-types). **Mandatory**. Use `0` to mean “no restriction (any gun type allowed)”.
* **`sightTypesMask`**: (Number) Allowed sight types as a bitmask of [Sight Types](#sight-types). **Mandatory**. Use `0` to mean “no restriction (any sight type allowed)”.

* **`numOfShots`**: (Number) Shots per stage. **Mandatory**. Valid range is `1`–`10`.
* **`duration`**: (Number) Duration of a stage in seconds. **Mandatory**. Valid range is `1`–`600`.
* **`numOfStages`**: (Number) Number of stages for the rule. **Mandatory**. Valid range is `1`–`10`.
* **`nextId`**: (Number) The `_id` of the next rule to follow; `0` if none. **Mandatory**. Must be `>= 0`.

## Enum Value Details

### Shooting Rule Positions

Corresponds to the `ShootingRulePosition` enum in `src/models/ShootingRuleCatalog.ts`.

* `1`: Standing (one-handed)
* `2`: Standing (two-handed)
* `4`: Sitting
* `8`: Kneeling
* `16`: Prone

Combine multiple positions using bitwise OR. Example: `1 | 2 = 3` means either standing one-handed or two-handed is allowed.

### Gun Types

Corresponds to the `GunType` enum in `src/models/GunCatalog.ts`.

* `1`: Handgun
* `2`: Rifle or Machine Gun
* `4`: Shotgun
* `8`: SMG or PDW
* `16`: Other

### Sight Types

Corresponds to the `SightType` enum in `src/models/Sight.ts`.

* `1`: Iron sights
* `2`: Red dot / Reflex
* `4`: Scope (magnified optics)
* `8`: Laser
* `16`: None (no sights)

### Unit of Range

Corresponds to constants in `src/models/RealmDataConst.ts`.

* `0`: Meter
* `1`: Yard
* `2`: Foot

## Character Encoding

The file should be encoded in UTF-8.

