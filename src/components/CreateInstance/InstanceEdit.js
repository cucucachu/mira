import React from 'react';

import AttributeEdit from './AttributeEdit';
import SingularRelationshipSelector from './SingularRelationshipSelector';
import NonSingularRelationshipSelector from './NonSingularRelationshipSelector';
import SubmitButton from './SubmitButton';

function InstanceEdit(props) {
    const attributes = props.schema.attributes;
    const singularRelationships = props.schema.relationships.filter(r => r.singular);
    const nonSingularRelationships = props.schema.relationships.filter(r => !r.singular);

    return (
        <div className="container">
            <div className="form">
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
                {
                    singularRelationships.map(r => 
                        <SingularRelationshipSelector
                            relationship={r}
                            value={ props.updatedInstance[r.name] }
                            classModel={ r.toClass }
                            key={'SingularRelationshipEdit:' + r.name}
                            onChange={props.onSelectSingularRelationship}
                        />
                    )
                }
                {
                    nonSingularRelationships.map(r => 
                        <NonSingularRelationshipSelector
                            relationship={r}
                            value={ props.updatedInstance[r.name] }
                            classModel={ r.toClass }
                            key={'NonSingularRelationshipEdit:' + r.name}
                            onChange={props.onSelectNonSingularRelationship}
                        />
                    )
                }
                <SubmitButton
                    onClick={props.onClickSubmit}
                />
            </div>
        </div>
    )
}

export { InstanceEdit as default }