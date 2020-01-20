import React, { Component } from 'react';

import InstanceAsRow from './InstanceAsRow';
import CreateInstanceButton from '../CreateInstanceButton';
import SortButton from './SortButton';

class InstancesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classModel: props.classModel,
            schema: props.schema,
            instances: props.instances,
            sortButtonStates: props.sortButtonStates,
            onClickDeleteInstance: props.onClickDeleteInstance,
            onClickViewInstance: props.onClickViewInstance,
            onClickCreateInstance: props.onClickCreateInstance,
            onClickSort: props.onClickSort,
        };
    }

    render() {
        return (
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">
                            <div>
                                <SortButton
                                    property="_id"
                                    name="Instance"
                                    symbol={String(this.state.sortButtonStates._id.symbol)}
                                    onClick={this.state.onClickSort} 
                                />
                            </div>
                        </th>
                        { 
                            this.state.schema.attributes
                                .map(a => 
                                    <th scope="col" key={'attribute' + a.name}>
                                        <SortButton
                                            name={a.name}
                                            property={a.name}
                                            symbol={this.state.sortButtonStates[a.name].symbol}
                                            onClick={this.state.onClickSort} 
                                        />
                                    </th>
                                )
                        }
                        { 
                            this.state.schema.relationships
                                .map(r => 
                                    <th scope="col" key={'relationship' + r.name}>
                                        <SortButton
                                            name={r.name}
                                            property={r.name}
                                            symbol={this.state.sortButtonStates[r.name].symbol}
                                            onClick={this.state.onClickSort} 
                                        />
                                    </th>
                                )
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