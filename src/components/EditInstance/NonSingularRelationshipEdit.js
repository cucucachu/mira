import React from 'react';

function NonSingularRelationshipEdit(props) {
    if (props.relationship.required) {
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
    else {  
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
}

function renderInstanceListItem(props) {
    if (props.instances) {
        return (
            <textarea 
                className="form-control" 
                readOnly={true}
                rows={numberOfRowsForTextArea(props)}
                value={InstancesAsTextRows(props)}
            ></textarea>
        )
    }
}

function InstancesAsTextRows(props) {
    let instancesAsText = '';
    for (const index in props.instances) {
        const instance = props.instances[index];
        instancesAsText = instancesAsText + instance.displayAs;
        if (index !== props.instances.length - 1) {
            instancesAsText = instancesAsText + '\n'
        }
    }
    return instancesAsText;
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

function numberOfRowsForTextArea(props) {
    if (props.instances.length < 5) {
        return props.instances.length;
    }
    else {
        return 5;
    }
}

export { NonSingularRelationshipEdit as default }