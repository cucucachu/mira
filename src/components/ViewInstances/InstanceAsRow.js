import React, { Component } from 'react';

import InstanceLink from './InstanceLink';
import InstanceSet from './InstanceSet';
import Attribute from './Attribute';
import DeleteInstanceButton from './DeleteInstanceButton';

class InstanceAsRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: props.schema,
            instance: props.instance,
            onClickDeleteInstance: props.onClickDeleteInstance,
            onClickViewInstance: props.onClickViewInstance,
        }
    }

    render() {
        const instance = this.state.instance;

        return (
            <tr>
                <td>
                    <InstanceLink
                        instance={instance}
                        onClick={this.state.onClickViewInstance}
                        key={'InstanceLink:'+instance.className+instance.id}
                    />
                </td>
                {
                    this.state.schema.attributes.map(a => {
                        return (
                            <td>
                                <Attribute
                                    value={this.state.instance[a.name] }
                                    key={'Attribute:'+instance.id+a.name}
                                />
                            </td>
                        )
                    })
                }
                {
                    this.state.schema.relationships.map(r => {
                        if (r.singular) {
                            const relatedInstance = this.state.instance[r.name];
                            return (
                                <td>
                                    <InstanceLink
                                        instance={relatedInstance}
                                        onClick={this.state.onClickViewInstance}
                                        key={'SingularRelationship:' + instance.id + r.name}
                                    />
                                </td>
                            )
                        }
                        else {
                            const relatedInstanceSet = this.state.instance[r.name];
                            return (
                                <td>
                                    <InstanceSet 
                                        instances={relatedInstanceSet}
                                        onClickViewInstance={this.state.onClickViewInstance}
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
                        onClick={this.state.onClickDeleteInstance}
                        key={'DeleteInstanceButton:' + instance.id}
                    />
                </td>
            </tr>
        );
    }
}

export {InstanceAsRow as default}