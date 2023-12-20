import { ObjectSchema, PropertySchema, PropertyTypeName } from "realm";

// Function to validate that the properties of a JSON object match the class properties
export function validateProperties(jsonObj: any, schema: ObjectSchema): boolean {
    // Skip empty lines
    if (Object.keys(jsonObj).length === 1 && jsonObj[Object.keys(jsonObj)[0]] === "") return true;

    // Get the properties defined in the class schema
    const classProps = Object.keys(schema.properties);

    // Iterate over each property in the class schema
    classProps.forEach(prop => {
        // Check if the type of the property in the JSON object matches the expected type
        const expectedType = getPropertyType(schema.properties[prop]);
        const actualType = typeof jsonObj[prop];

        // Check if the property exists in the JSON object
        if (! expectedType.endsWith('?') && !jsonObj.hasOwnProperty(prop)) {
            throw new SyntaxError(`CSV object is missing the required property: ${prop}`);
        }

        let valid = false
        switch (expectedType) {
            case 'int?':
                if (jsonObj[prop] === "") {
                    jsonObj[prop] = undefined;
                }
                if (jsonObj[prop] === undefined) return;
                // fall through
            case 'int':
                if (actualType === 'string' ) {
                    // Convert string to number if possible
                    const value = Number.parseInt(jsonObj[prop]);
                    if (Number.isInteger(value)) {
                        jsonObj[prop] = value;
                        return;
                    }
                }
                valid = (actualType === 'number' && Number.isInteger(jsonObj[prop]));
                break;
            case 'string?':
                if (jsonObj[prop] === undefined) return;
                // fall through
            case 'string':
                if (actualType === 'string') {
                    if (containControlCharacter(jsonObj[prop])) {
                        throw new TypeError(`Type mismatch for property ${prop} (value: ${jsonObj[prop]}). Contains control/invisible character.`);
                    }
                    valid = true;       
                }
                break;
            case 'bool?':
                if (jsonObj[prop] === "") {
                    jsonObj[prop] = undefined;
                }
                if (jsonObj[prop] === undefined) return;
                // fall through
            case 'bool':
                if (actualType === 'string') {
                    // Convert string to boolean if possible
                    if (jsonObj[prop].trim() === 'true') {
                        jsonObj[prop] = true;
                        return;
                    } else if (jsonObj[prop].trim() === 'false') {
                        jsonObj[prop] = false;
                        return;
                    }
                }
                valid = (actualType === 'boolean');
                break;
            default:
                throw new Error('Unsupported schema found.');
                break;
        }

        if (! valid) {
            throw new TypeError(`Type mismatch for property ${prop} (value: ${jsonObj[prop]}). Expected type: ${expectedType}, actual type: ${actualType}`);
        }
    });

    return true;
}

function getPropertyType(property: string | PropertySchema): string {
    if (typeof property === 'string') {
        return property;
    } else {
        return property.type;
    }
}

export function replaceEmptyStringsWithUndefined(jsonObj: any, schema: ObjectSchema): void {
    Object.keys(schema.properties).forEach(prop => {
        // if the property is nullable string, replace empty string to undefined
        if (jsonObj.hasOwnProperty(prop) && jsonObj[prop] === '') {
            if (getPropertyType(schema.properties[prop]) === 'string?') {
                jsonObj[prop] = undefined;
            }
        }
    });
}

/**
 * Check if the string contains only alphanumeric characters
 * @param str string to check
 * @returns true if the string contains only alphanumeric characters, false otherwise
 */
const regexAlphaNumeric = /^[a-zA-Z0-9]+$/;
export function isAlphaNumeric(str: string): boolean {
    return regexAlphaNumeric.test(str);
}

/**
 * Check if the string contains only printable ASCII characters
 * @param str string to check
 * @returns true if the string contains only printable ASCII characters, false otherwise
 */
const regexPrintableAscii = /^[\x20-\x7E]+$/;
export function isPrintableAscii(str: string): boolean {
    return regexPrintableAscii.test(str);
}

/**
 * Check if the string contains control/invisible character. C0, C1 control codes and DEL.
 * And other invisible characters see also: https://invisible-characters.com
 * @param str  string to check
 * @returns  true if the string contains control/invisible characters, false otherwise
 */
const regexControlCharacter = /[\x00-\x1F\x7F\x80-\x9F\u034F\u061C\u115F\u1160\u17B4\u17B5\u180E\u2000-\u206F\u3000\u2800\u3164\uFEFF]/;
export function containControlCharacter(str: string): boolean {
    return regexControlCharacter.test(str);
}

/**
 * Check if the string contains only latin characters
 * @param str string to check
 * @returns true if the string contains only latin characters, false otherwise
 */
const regexLatin = /^[\u0020-\u007E\u00A0-\u00FF\u0370-\u03FF\u2150-\u218F]+$/;
export function isLatinOrGreek(str: string): boolean {
    return regexLatin.test(str);
}

/**
 * Check if the string is empty or latin
 * @param str string to check
 * @returns true if the string is empty or latin, false otherwise
 */
export function isLatinOrGreekOrEmpty(str: string): boolean {
    return str === '' || isLatinOrGreek(str);
}

/**
 * Compare strings ignoring case and leading/trailing spaces
 * @param a     string to compare
 * @param b     string to compare
 * @returns     true if the strings are the same, false otherwise
 */
export function isSameString(a?: string, b?: string) {
    return a?.trim().toLowerCase() === b?.trim().toLowerCase();
}

/**
 * Compare strings ignoring case, leading/trailing spaces, dashes and dots
 * @param a string to compare
 * @param b string to compare
 * @returns true if the strings are the same, false otherwise
 */
export function fuzzyStringCompare(a: string, b: string): boolean {
    function normalize(str: string): string {
        return str
            .toLowerCase() // case insensitive
            .replace(/[-\s.]/g, ''); // Remove spaces, dashes and dots
    }

    return normalize(a) === normalize(b);
}

/**
 * Compare two instances of the same class.
 * Only compares properties that are not undefined.
 * Strings are compared using fuzzyStringCompare.
 * @param instanceA 
 * @param instanceB 
 * @param includeProps list of properties to include from comparison
 * @returns true if the instances are the same, false otherwise
 */
export function compareInstances<T extends object>(instanceA: T, instanceB: T, includeProps: string[]): boolean {
    for (const key in instanceA) {
        if (! includeProps.includes(key)) {
            continue;
        }

        if (instanceA.hasOwnProperty(key) && instanceB.hasOwnProperty(key)) {
            const valueA = instanceA[key];
            const valueB = instanceB[key];

            if (typeof valueA === "string" && typeof valueB === "string") {
                if (!fuzzyStringCompare(valueA, valueB)) {
                    return false;
                }
            }
            else if (valueA !== valueB) {
                return false;
            }
        }
    }
    return true;
}