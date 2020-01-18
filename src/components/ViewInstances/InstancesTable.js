import React, { Component } from 'react';

import InstanceAsRow from './InstanceAsRow';
import CreateInstanceButton from '../CreateInstanceButton';

class InstancesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classModel: props.classModel,
            schema: props.schema,
            instances: props.instances,
            onClickDeleteInstance: props.onClickDeleteInstance,
            onClickViewInstance: props.onClickViewInstance,
            onClickCreateInstance: props.onClickCreateInstance,
        };
    }

    render() {
        return (
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Instance</th>
                        { 
                            this.state.schema.attributes.map(a => <th scope="col" key={'attribute' + a.name}>{a.name}</th>)
                        }
                        { 
                            this.state.schema.relationships.map(r => <th scope="col" key={'relationship' + r.name}>{r.name}</th>)
                        }
                        <th scope="col">
                            <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            <CreateInstanceButton
                                classModel={this.state.classModel}
                                onClick={this.state.onClickCreateInstance} 
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        this.state.instances.map(i => {
                            return (
                                <InstanceAsRow 
                                    schema={this.state.schema} 
                                    instance={i} 
                                    onClickDeleteInstance={this.state.onClickDeleteInstance}
                                    onClickViewInstance={this.state.onClickViewInstance}
                                    key={'instanceAsRow:' + String(i.id)}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }
}

export { InstancesTable as default }