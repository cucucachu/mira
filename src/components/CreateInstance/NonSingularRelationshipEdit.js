import React from 'react';

function NonSingularRelationshipEdit(props) {
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
    if (props.instances) {
        return (
            <input type="text" className="form-control" readOnly={true} value={props.instances.map(i => i.displayAs)}></input>
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

export { NonSingularRelationshipEdit as default }