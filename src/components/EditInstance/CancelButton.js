import React from 'react';

function CancelButton(props) {
    return (
        <button
            className="btn btn-secondary"
            onClick={ props.onClick }
        >
            Cancel
        </button>
    )
}

export { CancelButton as default }