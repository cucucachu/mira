import React from 'react';

function SortButton(props) {
    return (
        <button 
            className="btn btn-dark btn-sm" 
            onClick={() => props.onClick(props.property)}
        >
            { props.name + ' ' + String.fromCharCode(props.symbol) }
        </button>
    )
}

export { SortButton as default }