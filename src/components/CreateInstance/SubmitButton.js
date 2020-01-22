import React from 'react';

function SubmitButton(props) {
    return (
        <button
            type="submit"
            className="btn btn-primary"
            onClick={ props.onClick }
        >
            Submit
        </button>
    )
}

export { SubmitButton as default }