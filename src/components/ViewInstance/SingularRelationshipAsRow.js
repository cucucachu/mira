import React from 'react';

import InstanceLink from '../ViewInstances/InstanceLink';

function SingularRelationshipAsRow(props) {
    return (
        <div className="row">
            <div className="col-2">
                <strong>{props.name}:</strong>
            </div>
            <div className="col-sm">
                <InstanceLink 
                    instance={props.instance}
                    onClick={props.onClick}
                />
            </div>
        </div>
    )
}

export { SingularRelationshipAsRow as default }