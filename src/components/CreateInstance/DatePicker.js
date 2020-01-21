import React from 'react';

function DatePicker(props) {
    return (
        <input 
            type="date" 
            className="form-control"
            value={props.value}
            onChange={ (e) => 
                props.onChange(e, props.attribute) 
            }
        ></input>
    )
}

export { DatePicker as default }