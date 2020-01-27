import React from 'react';

import AttributeEdit from './AttributeEdit';
import SingularRelationshipEdit from './SingularRelationshipEdit';
import NonSingularRelationshipEdit from './NonSingularRelationshipEdit';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';

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
                            invalid={props.invalidProperties.includes(a.name)}
                            key={'AttributeEdit:' + a.name}
                            onChangeAttribute={props.onChangeAttribute}
                        />
                    )
                }
                {
                    singularRelationships
                        .filter(r => {
                            if (!props.relationship || !props.relationship.mirrorRelationship) {
                                return true;
                            }
                            else {
                                return r.name !== props.relationship.mirrorRelationship;
                            }
                        })
                        .map(r => 
                            <SingularRelationshipEdit
                                instance={ props.updatedInstance[r.name] }
                                relationship={r}
                                invalid={props.invalidProperties.includes(r.name)}
                                key={'SingularRelationshipEdit:' + r.name}
                                onClickFindInstance={props.onClickFindInstance}
                                onClickCreateNestedInstance={props.onClickCreateNestedInstance}
                                onClickRemoveInstance={props.onClickRemoveInstance}
                            />
                    )
                }
                {
                    nonSingularRelationships
                        .filter(r => {
                            if (!props.relationship) {
                                return true;
                            }
                            else {
                                return r.name !== props.relationship.mirrorRelationship;
                            }
                        })
                        .map(r => 
                            <NonSingularRelationshipEdit
                                instances={ props.updatedInstance[r.name] }
                                relationship={r}
                                invalid={props.invalidProperties.includes(r.name)}
                                key={'NonSingularRelationshipEdit:' + r.name}
                                onClickFindInstance={props.onClickFindInstance}
                                onClickCreateNestedInstance={props.onClickCreateNestedInstance}
                                onClickRemoveInstance={props.onClickRemoveInstance}
                            />
                    )
                }
                <CancelButton
                    onClick={props.onClickCancel}
                />
                <SubmitButton
                    onClick={props.onClickSubmit}
                />
            </div>
        </div>
    )
}

export { InstanceEdit as default }