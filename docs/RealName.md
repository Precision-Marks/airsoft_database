# Add information about the real firearm that the gun is modeled after to the database

現在、データベース中のエアソフトガン名称は、オフィシャルWebPage記載の製品名を基本としている。
しかしそれだと、たとえばCYMA CM003はH&K G36Cが元ネタであるということがわからず、検索が不便。

ChatGPTによって、CYMA CM003 -> H&JK G36Cの情報を付け加えられないか？

添付したCSVデータは、エアソフトガンのデータベースで、フィールドは以下の意味を持ちます（今回関係ないフィールドは省略）

## Prompt

添付したCSVデータは、エアソフトガンのデータベースです。フィールドの内容は後に示す「CSVデータフォーマット」を参照してください。

現在、データベース中のエアソフトガン名称は、オフィシャルWebPage記載の製品名を基本としています。しかしそれだと、たとえばCYMA社の製品「CM003」は「H&K G36C」が元となる実銃であるということがわからず、検索が不便です。

このCSVデータのdescription, descriptionJaに、以下の条件で「エアガンに対応する実銃の名称」を追加することで、エアガンデータベースの情報を充実させてください。

結果はダウンロードできる形式でお願いします。

1. description

- _id < 10000 の場合は何もしない
- 既に`description`に値がセットされている場合は何もしない
- `shortName`の内容が、実銃の名称相当である場合は何もしない
- `manufacturerId`で表される製造元と、`shortName`で表される製品名から実銃の名称を想定し、descriptionに製品名(非日本語表記)を設定する
- 慣例的に製造元の情報もセットで記述されることが多い場合はそうする。

<example>
|manufacturerId|shortName|description|
|--------------|---------|-----------|
|cyma          |CM003    |H&M G36C   |
|marui         |G17 Gen.5 MOS|Glock17 Gen.5 MOS|
|marui         |P320     |SIG P320   |
</example>

1. descriptionJa

- _id < 10000 の場合は何もしない
- 既に`descriptionJa`に値がセットされている場合は何もしない
- `shortName`の内容が、実銃の名称相当である場合は何もしない
- `manufacturerId`で表される製造元と、`shortName`で表される製品名から実銃の名称を日本語表記で想定し、`descriptionJa`に製品名を設定する。ただし、`description`と極めて類似の内容なら設定をスキップ。
- 慣例的に製造元の情報もセットで記述されることが多い場合はそうする。

<example>
|manufacturerId|shortNameJa|descriptionJa|
|--------------|-----------|-------------|
|cyma          |CM003      |H&M G36C     |
|marui         |G17 Gen.5 MOS|グロック17 Gen.5 MOS|
|marui         |P320       |シグ・ザウエル P320|
</example>

## CSVデータフォーマット （今回関係ないフィールドは省略）

* **`_id`**: (Number) A unique, immutable identifier for the gun model. **Mandatory**. Must be a non-negative integer. See `src/models/GunIdRange.ts` for manufacturer-specific ID ranges. Generic guns (see `generic` field) must have an ID less than 10000. **NOTE**: Once assigned, this ID must never be deleted or reassigned to a different gun model. Note that the `npm run test-database` command does not check for this constraint.

* **`manufacturerId`**: (String) The unique identifier of the manufacturer, corresponding to the `_id` field in `ManufacturerCatalog.csv`. **Mandatory**. Must contain only printable ASCII characters. Cannot be `unknown` if `generic` is true.
* **`shortName`**: (String) A short, commonly used name for the gun model (e.g., "M4A1", "G17"). **Mandatory**. Must contain only Latin or Greek characters.
* **`fullName`**: (String) The full official name of the gun model. **Optional**. If provided, must contain only Latin or Greek characters.
* **`description`**: (String) A brief description of the gun model. **Optional**.
* **`shortNameJa`**: (String) The short name of the gun model in Japanese. **Optional**. Cannot contain full-width parentheses `（` or `）`. Please use half-width parentheses `(` and `)` instead if needed.
* **`fullNameJa`**: (String) The full name of the gun model in Japanese. **Optional**. Cannot contain full-width parentheses `（` or `）`. Please use half-width parentheses `(` and `)` instead if needed.
* **`descriptionJa`**: (String) A brief description of the gun model in Japanese. **Optional**.

