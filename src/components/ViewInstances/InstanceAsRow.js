import React, { Component } from 'react';

class InstanceAsRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: props.schema,
            instance: props.instance,
        }
    }

    render() {
        return (
            <tr>
                <td>{this.state.instance.displayAs}</td>
                {
                    this.state.schema.attributes.map(a => {
                        return (
                            <td>{this.state.instance[a.name] }</td>
                        )
                    })
                }
                {
                    this.state.schema.relationships.map(r => {
                        if (r.singular) {
                            if (this.state.instance[r.name]) {
                                return (
                                    <td>
                                        {
                                            this.state.instance[r.name] ? this.state.instance[r.name].displayAs: 'empty'
                                        }
                                    </td>
                                );
                            }
                            else {
                                return <td>Empty</td>;
                            }
                        }
                        else {
                            if (this.state.instance[r.name].length > 0) { 
                                return (
                                    <td>
                                    {this.state.instance[r.name].map(i => i.displayAs + '\n')}
                                    </td>
                                )
                            }
                            else {
                                return <td>Empty</td>;
                            }
                        }

                    })
                }
                <td>
                    <div className="btn-group btn-group-sm">
                        <button className="btn btn-info">View</button>
                        <button className="btn btn-warning">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </td>
            </tr>
        );
    }
}

export {InstanceAsRow as default}