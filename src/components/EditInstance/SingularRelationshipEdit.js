import React from 'react';

function SingularRelationshipEdit(props) {
    return (
        <div className="form-group">
            <label>
                <strong>{ props.relationship.name }</strong>
            </label>
            <div className="input-group">
                { renderInstanceListItem(props) }
                { renderButtons(props) }
            </div>
        </div>
    )
}

function renderInstanceListItem(props) {
    if (props.instance) {
        return (
            <input type="text" className="form-control" readOnly={true} value={props.instance.displayAs}></input>
        )
    }
    else {
        return (
            <input type="text" className="form-control" readOnly={true} value=""></input>
        )
    }
}

function renderButtons(props) {
    return (
        <div className="input-group-append">
            <button 
                className="btn btn-outline-primary"
                data-toggle="modal" 
                data-target="#instance-selector-modal"
                onClick={() => props.onClickFindInstance(props.relationship)}
            >
                Select
            </button>
        </div>
    )
}

export { SingularRelationshipEdit as default }