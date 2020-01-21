import React from 'react';

import TextBox from './TextBox';

function AttributeEdit(props) {
    return (
        <div className="form-group">
            { label(props) }
            { inputForType(props) }
        </div>
    )
}

function label(props) {
    if (props.attribute.required) {
        return (
            <label>
                <strong className="text-info">
                    { props.attribute.name}
                </strong>
            </label>
        )
    }
    else {
        return (
            <label>
                <strong>
                    { props.attribute.name}
                </strong>
            </label>
        )
    }
}

function inputForType(props) {
    switch (props.attribute.type) {
        case 'Boolean':
            break;
        case 'String':
            return (
                <TextBox
                    attribute={props.attribute.name}
                    value={props.value !== null ? props.value : ''}
                    onChange={props.onChangeAttribute}
                />
            )
        case 'Number':
            break;
        case 'Date':
            break;
        default: 
            throw new Error('AttributeEdit.inputForType(): Invalid Type: ' + props.attribute.type);
    }
}

export { AttributeEdit as default }