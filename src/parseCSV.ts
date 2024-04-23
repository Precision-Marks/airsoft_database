import fs = require('fs');
import _ from 'lodash';
import { parse, CsvError } from 'csv-parse/sync';
import { ObjectSchema } from "realm";
import { replaceEmptyStringsWithUndefined, validateProperties } from './utils';
import { RealmManufacturerCatalog } from './schemas/RealmManufacturerCatalog';

const parseOptions = {
    columns: true,
    relax_column_count_less: true, // to accept empty lines with column enabled
    skip_empty_lines: false // keep empty line to keep track of line number
};

export function parseCsvString(csvString: string, schema: ObjectSchema): any[] {
    const records = parse(csvString, parseOptions);
    return validateAndProcessRecords(records, schema);
}

export function parseCsvFile(filename: string, schema: ObjectSchema): any[] {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const records = parse(fileContent, parseOptions);

    return validateAndProcessRecords(records, schema);
}

function validateAndProcessRecords(records: any[], schema: ObjectSchema): any[] {
    for (let index = 0; index < records.length; index++) {
        const record = records[index];

        // Skip empty lines and make them null
        if (Object.keys(record).length === 1 && _.isEqual(record, { _id: '' })) {
            records[index] = null;
            continue;
        }

        try {
            validateProperties(record, schema) // throws error if validation fails
        } catch (e) {
            if (e instanceof TypeError) {
                throw new TypeError(`Error validating record at line ${index+2}: ${e.message}`);
            } else {
                throw new Error(`Error validating record at line ${index+2}: ${JSON.stringify(e)}, record: ${JSON.stringify(record)}`);
            }
        }
        replaceEmptyStringsWithUndefined(record, schema);    
    };

    return records;
}
