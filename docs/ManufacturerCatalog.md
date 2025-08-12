# Manufacturer Catalog CSV Schema

This document describes the schema for the `source_data/ManufacturerCatalog.csv` file.

The CSV file contains information about various airsoft manufacturers. Each row represents a single manufacturer. The first row of the CSV file contains the header, defining the fields for each subsequent row.

## Fields

The following fields are defined in the CSV header:

* **`_id`**: (String) A unique identifier for the manufacturer (actually the airsoft brand). This is typically a URL-safe, lowercase abbreviation or common short name (e.g., `a&k`, `marui`). **Mandatory** and must be unique.
* **`shortName`**: (String) A commonly used short name for the manufacturer (e.g., "A&K", "MARUI"). **Mandatory**.
* **`longName`**: (String) The full official name of the manufacturer (e.g., "A&K AIRSOFT", "TOKYO MARUI"). **Optional**. Can be empty if not applicable or the same as `shortName`.
* **`altName`**: (String) An alternative name or abbreviation for the manufacturer. **Optional**. Can be empty. The string is used for search only.
* **`description`**: (String) A brief description of the manufacturer. **Optional**. Can be empty.
* **`url`**: (String) The official URL for the manufacturer's main website (typically English or global). **Optional**. Can be empty.
* **`shortNameJa`**: (String) The short name of the manufacturer in Japanese. **Optional**. Can be empty.
* **`longNameJa`**: (String) The full name of the manufacturer in Japanese. **Optional**. Can be empty.
* **`altNameJa`**: (String) An alternative name or abbreviation in Japanese. **Optional**. Can be empty. The string is used for search only.
* **`descriptionJa`**: (String) A brief description of the manufacturer in Japanese. **Optional**. Can be empty.
* **`urlJa`**: (String) The URL for the manufacturer's Japanese website, if available. **Optional**. Can be empty.

## Character Encoding

The file should be encoded in UTF-8 to support characters from different languages. 