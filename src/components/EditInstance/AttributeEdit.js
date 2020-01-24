import React from 'react';

import TextBox from './TextBox';
import DatePicker from './DatePicker';
import Checkbox from './Checkbox';

function AttributeEdit(props) {
    if (props.attribute.type !== 'Boolean') {
        return (
            <div className="form-group">
                { label(props) }
                { inputForType(props) }
            </div>
        )
    }
    else {
        return (
            <div className="form-check">
            { inputForType(props) }
                { label(props) }
            </div>
        )
    }
}

function labelColor(props) {
    if (props.invalid) {
        return 'text-danger';
    }
    if (props.attribute.required) {
        return 'text-info';
    }
    return '';
}

function label(props) {
    if (props.attribute.type !== 'Boolean') {
        return (
            <label>
                <strong className={labelColor(props)}>
                    { props.attribute.name}
                </strong>
            </label>
        )
    }
    else {
        return (
            <label className="form-check-label">
                <strong className={labelColor(props)}>
                    { props.attribute.name}
                </strong>
            </label>
        )
    }
}

function inputForType(props) {
    switch (props.attribute.type) {
        case 'Boolean':
            return (
                <Checkbox
                    attribute={props.attribute}
                    value={props.value !== null ? props.value : false}
                    onChange={props.onChangeAttribute}
                />
            )
        case 'String':
            return (
                <TextBox
                    attribute={props.attribute}
                    required={props.attribute.required}
                    value={props.value !== null ? props.value : ''}
                    onChange={props.onChangeAttribute}
                />
            )
        case 'Number':
            return (
                <TextBox
                    attribute={props.attribute}
                    required={props.attribute.required}
                    value={props.value !== null ? props.value : ''}
                    onChange={props.onChangeAttribute}
                />
            )
        case 'Date':
            return (
                <DatePicker
                    attribute={props.attribute}
                    required={props.attribute.required}
                    value={props.value !== null ? props.value : ''}
                    onChange={props.onChangeAttribute}
                />
            )
        default: 
            throw new Error('AttributeEdit.inputForType(): Invalid Type: ' + props.attribute.type);
    }
}

export { AttributeEdit as default }