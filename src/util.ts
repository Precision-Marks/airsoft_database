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
                valid = (actualType === 'string');
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
                    if (jsonObj[prop] === 'true') {
                        jsonObj[prop] = true;
                        return;
                    } else if (jsonObj[prop] === 'false') {
                        jsonObj[prop] = false;
                        return;
                    }
                }
                valid = (actualType === 'boolean');
                break;
            default:
                break;
        }

        if (! valid) {
            throw new TypeError(`Type mismatch for property ${prop} (value: ${jsonObj[prop]}). Expected type: ${expectedType}, actual type: ${actualType}`);
        }
    });

    return true;
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

function getPropertyType(property: string | PropertySchema): string {
    if (typeof property === 'string') {
        return property;
    } else {
        return property.type;
    }
}

