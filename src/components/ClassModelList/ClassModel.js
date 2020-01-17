import React from 'react';

function ClassModel(props) {
    return (
        <div className="row justify-content-between"> 
            <div className="col-4">
                {props.className} 
            </div>
            <div className="col-2">
                <button 
                    onClick={() => props.onClick(props.className)}
                    className="btn btn-sm btn-primary"
                >
                    View
                </button>
            </div>
        </div>
    );
}

export {ClassModel as default}