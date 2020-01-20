import React from 'react';

function EditInstanceButton(props) {
    return (
        <button 
            className="btn btn-success btn-sm" 
            onClick={() => props.onClick(props.instance)}
        >Edit</button>
    )
}

export { EditInstanceButton as default }