import React from 'react';

function ErrorAlert(props) {
    if (props.message) {
        return (
            <div className="container">
                <div className="alert alert-danger" role="alert">
                    {props.message}
                </div>
            </div>
        )
    }
    else {
        return <div></div>
    }
}

export { ErrorAlert as default }