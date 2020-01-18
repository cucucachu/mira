import React from 'react';

function Spinner() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-5"></div>
                <div className="col-2">    
                    <div className="spinner-border text-primary"></div>
                </div>
                <div className="col-5"></div>
            </div>
        </div>
    )
}

export { Spinner as default }