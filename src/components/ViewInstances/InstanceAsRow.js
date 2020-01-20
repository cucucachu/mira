import React from 'react';

import InstanceLink from './InstanceLink';
import InstanceSet from './InstanceSet';
import Attribute from './Attribute';
import DeleteInstanceButton from './DeleteInstanceButton';

function InstanceAsRow(props) {
        const instance = props.instance;

        return (
            <tr>
                <td>
                    <InstanceLink
                        instance={instance}
                        onClick={props.onClickViewInstance}
                        key={'InstanceLink:'+instance.className+instance.id}
                    />
                </td>
                {
                    props.schema.attributes.map(a => {
                        return (
                            <td key={'AttributeCell:'+instance.id+a.name}>
                                <Attribute
                                    value={props.instance[a.name] }
                                    key={'Attribute:'+instance.id+a.name}
                                />
                            </td>
                        )
                    })
                }
                {
                    props.schema.relationships.map(r => {
                        if (r.singular) {
                            const relatedInstance = props.instance[r.name];
                            return (
                                <td key={'SingularRelationshipCell:' + instance.id + r.name}>
                                    <InstanceLink
                                        instance={relatedInstance}
                                        onClick={props.onClickViewInstance}
                                        key={'SingularRelationship:' + instance.id + r.name}
                                    />
                                </td>
                            )
                        }
                        else {
                            const relatedInstanceSet = props.instance[r.name];
                            return (
                                <td key={'NonSingularRelationshipCell:' + instance.id + r.name}>
                                    <InstanceSet 
                                        instances={relatedInstanceSet}
                                        onClickViewInstance={props.onClickViewInstance}
                                        key={'NonSingularRelationship:' + instance.id + r.name}
                                    />
                                </td>
                            )
                        }

                    })
                }
                <td>
                    <DeleteInstanceButton
                        instance={instance}
                        onClick={props.onClickDeleteInstance}
                        key={'DeleteInstanceButton:' + instance.id}
                    />
                </td>
            </tr>
        );
}

export {InstanceAsRow as default}