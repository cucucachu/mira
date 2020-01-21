import React from 'react';

import AttributeEdit from './AttributeEdit';

function InstanceEdit(props) {
    const attributes = props.schema.attributes;
    // const singularRelationships = props.schema.relationships.filter(r => r.singular);
    // const nonSingularRelationships = props.schema.relationships.filter(r => !r.singular);

    return (
        <div className="container">
            {
                attributes.map(a => 
                    <AttributeEdit
                        attribute={a}
                        value={ props.updatedInstance[a.name] }
                        key={'AttributeEdit:' + a.name}
                        onChangeAttribute={props.onChangeAttribute}
                    />
                )
            }
        </div>
    )
}

export { InstanceEdit as default }