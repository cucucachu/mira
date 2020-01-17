import React, { Component } from 'react';

import InstancesTable from './InstancesTable';
import TablePages from './TablePages';

class ViewInstances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classModel: props.classModel,
            onClickHome: props.onClickHome,
            schema: {
                attributes: [],
                relationships: [],
            },
            instances: [],
            page: 0,
            pageSize: 10,
            totalNumberOfInstances: 0,
            loaded: false,
        };
    }

    componentDidMount() {
        fetch('http://localhost:8000/mira/' + this.state.classModel)
            .then(response => response.json())
            .then((schema) => {
                const postRequest = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        className: this.state.classModel,
                        pageSize: this.state.pageSize,
                    }),
                }
                fetch('http://localhost:8000/mira/getInstances', postRequest)
                    .then(response => response.json())
                    .then(getInstancesResponse => {
                        let newState = {};
                        Object.assign(newState, this.state);
                        newState = {
                            classModel: this.state.classModel,
                            schema,
                            instances: getInstancesResponse.instances,
                            page: getInstancesResponse.page,
                            pageSize: getInstancesResponse.pageSize,
                            totalNumberOfInstances: getInstancesResponse.totalNumberOfInstances,
                            loaded: true,
                        }
                        this.setState(newState);
                    }
                );
            }
        );
    }

    renderInfo() {
        if (this.state.loaded) {
            return (
                <div id="instances-info">
                    Viewing instances 
                    {' ' + ((this.state.page % this.state.totalNumberOfInstances) + 1) + ' '}
                    through 
                    {' ' + ((this.state.page % this.state.totalNumberOfInstances) + this.state.pageSize)+ ' '}
                    of 
                    {' ' + (this.state.totalNumberOfInstances)}
                </div>
            )
        }
        else return <div id="instances-info"></div>
    }

    renderInstancesTable() {
        if (this.state.loaded) {
            if (this.state.instances.length) {
                return (
                    <div className="container">
                    {this.renderInfo()}
                    <InstancesTable 
                        classModel={this.state.classModel}
                        schema={this.state.schema}
                        instances={this.state.instances}
                    />
                    <div className="row justify-content-between">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <TablePages
                                page={this.state.page}
                                lastPage={(this.state.totalNumberOfInstances / this.state.pageSize) - (this.state.totalNumberOfInstances % this.state.pageSize)}
                            />
                        </div>
                        <div className="col-4"></div>
                    </div>
                    </div>
                )
            }
            else return <div className="container">No Instances</div>
        }
        else return <div className="container"><div className="spinner-border text-primary"></div></div>
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col col-sm">
                            <button 
                                onClick={this.state.onClickHome}
                                className="btn btn-primary"
                            >
                                Home
                            </button>

                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-11">
                            <h4>View Instances of {this.state.classModel}</h4> 
                        </div>
                        <div className="col-1">
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </div>
                {this.renderInstancesTable()}
            </div>
        );
    }
}

export { ViewInstances as default }