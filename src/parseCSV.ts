import { parse } from 'csv-parse/sync';
import fs = require('fs');
import { ObjectSchema } from "realm";
import { replaceEmptyStringsWithUndefined, validateProperties } from './util';

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
    records.forEach((record, index) => {
        // Skip empty lines
        if (Object.keys(record).length === 0) return;
        
        try {
            validateProperties(record, schema) // throws error if validation fails
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(`Error validating record at line ${index+1}: ${e.message}, record: ${JSON.stringify(record)}`);
            } else {
                throw new Error(`Error validating record at line ${index+1}: ${JSON.stringify(e)}, record: ${JSON.stringify(record)}`);
            }
        }
        replaceEmptyStringsWithUndefined(record, schema);    
    });

    return records;
}
