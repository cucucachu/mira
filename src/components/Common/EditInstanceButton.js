import React from 'react';

function EditInstanceButton(props) {
    return (
        <button 
            className="btn btn-success btn-sm" 
            onClick={() => props.onClick(props.instance.className, props.instance.id)}
        >Edit</button>
    )
}

export { EditInstanceButton as default }