import React from 'react';

function Checkbox(props) {
    return (
        <input 
            type="checkbox" 
            className="form-check-input"
            checked={props.value}
            onChange={ (e) => 
                props.onChange(e, props.attribute) 
            }
        ></input>
    )
}

export { Checkbox as default }