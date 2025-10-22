# SqlDelight用データ作成対応計画

現在、Realm DB形式のデータを作成しているが、これに加えてSqlDelight(Sqlite3)形式のデータも作成する。

- sqlite3 3.8以上に対応

## リソース

- SqlDelightスキーマ定義

sqldelight/catalog以下に、CatalogMetadata.sq, Gun.sq, Manufacturer.sq, ShootingRule.sq を定義済み。

- 空データベースファイル

db/templates/catalog_data.db

このDBファイルに対して、データをINSERTする

## 実装上のヒント

- sqlite3用モジュールは、better-sqlite3を使用する(install済み)

- 元のcsvデータのバリデーションは、既存のRealm用ロジックがパスすればよしとする。したがって、`npm run test-database`の動作に関しては現状から変更なし。

- RealmでBoolを使用している箇所は、Sqlite3においてはINT (1 or 0)で表す。

- 現状のrealm用実装は原則として変更しない

- 作成したファイルは、db/sqlite以下に格納する。catalog_data.dbとcatalog_data.db.commitidの2つ。

## 実装案

- src/index.ts, src/create*.ts を、src/realmに移動。それ以外のtsファイルはsqldelightでも使用されるのでそのまま
- src/sqldelight/ を作成、その下にindex.ts, create*.tsを作成する。いずれもrealm版を参考に、sqlite3用実装を行う
- src/index.tsを新設し、src/realm/index.ts, src/sqldelight/index.tsを呼び出す