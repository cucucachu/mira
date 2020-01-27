function validateInstance(instance, schema, ignoreRelationship=null) {
    let invalidProperties = [];
    let error = '';
    const missingRequiredFields = validateRequiredFields(instance, schema, ignoreRelationship);
    const missingRequiredGroups = validateRequiredGroup(instance, schema, ignoreRelationship);
    const mutexesWithMultipleValues = validateMutex(instance, schema, ignoreRelationship);

    if (missingRequiredFields.length) {
        invalidProperties = invalidProperties.concat(missingRequiredFields);
        error = 'Please fill out all required fields.'
    }

    if (missingRequiredGroups.length) {
        invalidProperties = invalidProperties.concat(missingRequiredGroups);
        if (error.length) {
            error = error + '\n';
        }
        error = error + 'Please select at least one item in each required group.';
    }

    if (mutexesWithMultipleValues.length) {
        invalidProperties = invalidProperties.concat(mutexesWithMultipleValues);
        if (error.length) {
            error = error + '\n';
        }
        error = error + 'Only select one item in a mutex.';
    }

    return {
        invalidProperties,
        error,
    };
}

function validateRequiredFields(instance, schema, ignoreRelationship) {
    const invalidProperties = [];

    for (const attribute of schema.attributes) {
        if (attribute.required) {
            if (instance[attribute.name] === null || instance[attribute.name] === '') {
                invalidProperties.push(attribute.name);
            }
        }
    }
    for (const singularRelationship of schema.relationships.filter(r => r.singular)) {
        if (singularRelationship.required) {
            if (instance[singularRelationship.name] === null && singularRelationship.name !== ignoreRelationship) {
                invalidProperties.push(singularRelationship.name);
            }
        }
    }
    for (const nonSingularRelationship of schema.relationships.filter(r => !r.singular)) {
        if (nonSingularRelationship.required) {
            if (instance[nonSingularRelationship.name].length === 0 && nonSingularRelationship.name !== ignoreRelationship) {
                invalidProperties.push(nonSingularRelationship.name);
            }
        }
    }

    return invalidProperties;
}

function validateRequiredGroup(instance, schema, ignoreRelationship) {
    const invalidProperties = [];
    const requiredGroups = [];
    const properties = schema.attributes.concat(schema.relationships);

    for (const property of properties) {
        if (property.requiredGroup && !requiredGroups.includes(property.requiredGroup)) {
            requiredGroups.push(property.requiredGroup);
        }
    }

    if (requiredGroups.length === 0) {
        return invalidProperties;
    }

    for (const attribute of schema.attributes) {
        if (attribute.requiredGroup) {
            if (attribute.list) {
                if (instance[attribute.name] !== null && instance[attribute.name].length) {
                    const index = requiredGroups.indexOf(attribute.requiredGroup);
                    if (index !== -1) {
                        requiredGroups.splice(index, 1);
                    }
                }
            }
            else {
                if (instance[attribute.name] !== null && instance[attribute.name] !== '') {
                    const index = requiredGroups.indexOf(attribute.requiredGroup);
                    if (index !== -1) {
                        requiredGroups.splice(index, 1);
                    }
                }
            }
        }
    }

    for (const singularRelationship of schema.relationships.filter(r => r.singular)) {
        if (singularRelationship.requiredGroup) {
            if (instance[singularRelationship.name] !== null || singularRelationship.name === ignoreRelationship) {
                const index = requiredGroups.indexOf(singularRelationship.requiredGroup);
                if (index !== -1) {
                    requiredGroups.splice(index, 1);
                }

            }
        }
    }

    for (const nonSingularRelationship of schema.relationships.filter(r => !r.singular)) {
        if (nonSingularRelationship.requiredGroup) {
            if ((instance[nonSingularRelationship.name] !== null && instance[nonSingularRelationship.name].length)|| nonSingularRelationship.name === ignoreRelationship) {
                const index = requiredGroups.indexOf(nonSingularRelationship.requiredGroup);
                if (index !== -1) {
                    requiredGroups.splice(index, 1);
                }
            }
        }
    }

    if (requiredGroups.length) {
        for (const requiredGroup of requiredGroups) {
            for (const property of properties) {
                if (property.requiredGroup === requiredGroup) {
                    invalidProperties.push(property.name);
                }
            }
        }
    }

    return invalidProperties;
}

function validateMutex(instance, schema, ignoreRelationship) {
    const invalidProperties = [];
    const mutexes = [];
    const mutexesWithMultipleValues = [];
    const properties = schema.attributes.concat(schema.relationships);

    for (const property of properties) {
        if (property.mutex && !mutexes.includes(property.mutex)) {
            mutexes.push(property.mutex);
        }
    }

    if (mutexes.length === 0) {
        return invalidProperties;
    }

    for (const mutex of mutexes) {
        let numberOfPropertiesSet = 0;

        for (const attribute of schema.attributes) {
            if (attribute.mutex) {
                if (attribute.list) {
                    if (instance[attribute.name] !== null && instance[attribute.name].length) {
                        numberOfPropertiesSet++;
                    }
                }
                else {
                    console.log('in here for ' + attribute.name);
                    console.log(instance[attribute.name]);
                    if (instance[attribute.name] !== null && instance[attribute.name] !== '') {
                        numberOfPropertiesSet++;
                    }
                }
            }
        }
    
        for (const singularRelationship of schema.relationships.filter(r => r.singular)) {
            if (singularRelationship.mutex) {
                if (instance[singularRelationship.name] !== null || singularRelationship.name === ignoreRelationship) {
                    numberOfPropertiesSet++;    
                }
            }
        }
    
        for (const nonSingularRelationship of schema.relationships.filter(r => !r.singular)) {
            if (nonSingularRelationship.mutex) {
                if ((instance[nonSingularRelationship.name] !== null && instance[nonSingularRelationship.name].length) || nonSingularRelationship.name === ignoreRelationship) {
                    numberOfPropertiesSet++;
                }
            }
        }

        console.log(mutex + ': ' + numberOfPropertiesSet);

        if (numberOfPropertiesSet > 1) {
            mutexesWithMultipleValues.push(mutex);
        }
    }

    for (const property of properties) {
        if (property.mutex && mutexesWithMultipleValues.includes(property.mutex)) {
            invalidProperties.push(property.name);
        }
    }
    console.log(invalidProperties);

    return invalidProperties;
}

export { validateInstance }