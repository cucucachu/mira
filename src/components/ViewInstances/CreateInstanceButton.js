import React from 'react';

function CreateInstanceButton(props) {
    return (
        <button 
            className="btn btn-info btn-sm" 
            onClick={() => props.onClick(props.classModel)}
        >+</button>
    )
}

export { CreateInstanceButton as default }