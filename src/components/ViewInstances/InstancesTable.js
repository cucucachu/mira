import React from 'react';

import InstanceAsRow from './InstanceAsRow';
import CreateInstanceButton from '../Common/CreateInstanceButton';
import SortButton from './SortButton';

function InstancesTable(props) {
    return (
        <table className="table table-striped table-bordered">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">
                        <div>
                            <SortButton
                                property="_id"
                                name="Instance"
                                symbol={String(props.sortButtonStates._id.symbol)}
                                onClick={props.onClickSort} 
                            />
                        </div>
                    </th>
                    { 
                        props.schema.attributes
                            .map(a => 
                                <th scope="col" key={'attribute' + a.name}>
                                    <SortButton
                                        name={a.name}
                                        property={a.name}
                                        symbol={props.sortButtonStates[a.name].symbol}
                                        onClick={props.onClickSort} 
                                    />
                                </th>
                            )
                    }
                    { 
                        props.schema.relationships
                            .map(r => 
                                <th scope="col" key={'relationship' + r.name}>
                                    <SortButton
                                        name={r.name}
                                        property={r.name}
                                        symbol={props.sortButtonStates[r.name].symbol}
                                        onClick={props.onClickSort} 
                                    />
                                </th>
                            )
                    }
                    <th scope="col">
                        <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <CreateInstanceButton
                            classModel={props.classModel}
                            onClick={props.onEditCreateInstance} 
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                { 
                    props.instances.map(i => {
                        return (
                            <InstanceAsRow 
                                schema={props.schema} 
                                instance={i} 
                                onClickDeleteInstance={props.onClickDeleteInstance}
                                onClickViewInstance={props.onClickViewInstance}
                                key={'instanceAsRow:' + String(i.id)}
                            />
                        );
                    })
                }
            </tbody>
        </table>
    );
}

export { InstancesTable as default }