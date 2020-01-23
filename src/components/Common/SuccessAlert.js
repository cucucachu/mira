import React from 'react';

function SuccessAlert(props) {
    if (props.message) {
        return (
            <div className="container">
                <div className="alert alert-success" role="alert">
                    {props.message}
                </div>
            </div>
        )
    }
    else {
        return <div></div>
    }
}

export { SuccessAlert as default }