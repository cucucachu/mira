import React from 'react';

function AttributeAsRow(props) {
    return (
        <div className="row">
            <div className="col-2">
                <strong>{props.name}:</strong>
            </div>
            <div className="col-sm">
                <p>{attributeValue(props)}</p>
            </div>
        </div>
    )
}

function attributeValue(props) {
    if (props.type === 'Boolean') {
        if (props.value === true) return 'true';
        else if (props.value === false) return 'false';
        else return '';
    }
    else return props.value;
}

export { AttributeAsRow as default }