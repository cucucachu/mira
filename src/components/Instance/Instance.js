import React from 'react';

import ClassModelLink from '../ClassModelTable/ClassModelLink';
import AttributeAsRow from './AttributeAsRow';
import SingularRelationshipAsRow from './SingularRelationshipAsRow'

function Instance(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <strong>Class Model:</strong>
                </div>
                <div className="col-sm">
                    <ClassModelLink
                        classModel={props.instance.className}
                        onClick={props.onClickViewInstances}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <strong>Id:</strong>
                </div>
                <div className="col-sm">
                    <p>{props.instance.id}</p>
                </div>
            </div>
            { 
                props.schema.attributes
                    .map(a => 
                        <AttributeAsRow 
                            name={a.name} 
                            value={props.instance[a.name]}
                            type={a.type}
                            key={'AttributeAsRow:' + props.instance.id + '.' + a.name}
                        />
                    )
            }
            {
                props.schema.relationships
                    .filter(r => r.singular)
                    .map(r => 
                        <SingularRelationshipAsRow
                            name={r.name}
                            instance={props.instance[r.name]}
                            onClick={props.onClickViewInstance}
                            key={'SingularRelationshipAsRow:' + props.instance.id + '.' + r.name}
                        />
                    )
            }
        </div>
    )
}

export { Instance as default }