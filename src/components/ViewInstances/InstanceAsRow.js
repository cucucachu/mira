import React, { Component } from 'react';

import InstanceLink from './InstanceLink';
import InstanceSet from './InstanceSet';
import Attribute from './Attribute';

class InstanceAsRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: props.schema,
            instance: props.instance,
        }
    }

    render() {
        const instance = this.state.instance;

        return (
            <tr>
                <td>
                    <InstanceLink
                        instance={instance}
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
                                        key={'NonSingularRelationship:' + instance.id + r.name}
                                    />
                                </td>
                            )
                        }

                    })
                }
                <td>
                    <button className="btn btn-danger btn-sm" key={'DeleteInstanceButton:' + instance.id}>Delete</button>
                </td>
            </tr>
        );
    }
}

export {InstanceAsRow as default}