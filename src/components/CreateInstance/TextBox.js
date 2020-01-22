import React from 'react';

function TextBox(props) {
    return (
        <input 
            type="text" 
            className="form-control"
            required={props.required}
            value={String(props.value)}
            onChange={ (e) => 
                props.onChange(e, props.attribute) 
            }
        ></input>
    )
}

export { TextBox as default }