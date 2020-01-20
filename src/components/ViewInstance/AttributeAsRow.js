import React from 'react';

function AttributeAsRow(props) {
    return (
        <div className="row">
            <div className="col-2">
                <strong>{props.name}:</strong>
            </div>
            <div className="col-sm">
                <p>{props.value}</p>
            </div>
        </div>
    )
}

export { AttributeAsRow as default }