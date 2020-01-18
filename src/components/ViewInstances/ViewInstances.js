import React, { Component } from 'react';

import InstancesTable from './InstancesTable';
import TablePagination from './TablePagination';
import Spinner from '../Spinner';

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
            page: 1,
            pageSize: 10,
            totalNumberOfInstances: 0,
            loaded: false,
            onClickDeleteInstance: props.onClickDeleteInstance,
            onClickViewInstance: props.onClickViewInstance,
            onClickCreateInstance: props.onClickCreateInstance,
        };
    }

    loadPage(pageNumber) {
        let newState = {};
        Object.assign(newState, this.state);
        newState.loaded = false;
        this.setState(newState);

        if (pageNumber <= 0) {
            console.log('bad page number');
        }

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
                        page: pageNumber-1,
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
                            page: getInstancesResponse.page + 1,
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

    componentDidMount() {
        this.loadPage(1);
    }

    handleClickPage(pageNumber) {
        this.loadPage(pageNumber);
    }

    renderInfo() {
        if (this.state.loaded) {
            return (
                <div id="instances-info">
                    Viewing instances 
                    {' ' + (((this.state.page - 1) * this.state.pageSize) + 1) + ' '}
                    through 
                    {' ' + (((this.state.page -1) * this.state.pageSize) + this.state.pageSize)+ ' '}
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
                        onClickDeleteInstance={this.state.onClickDeleteInstance}
                        onClickViewInstance={this.state.onClickViewInstance}
                        onClickCreateInstance={this.state.onClickCreateInstance}
                        key="InstancesTable"
                    />
                    <div className="row justify-content-between">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <TablePagination
                                page={this.state.page}
                                lastPage={(this.state.totalNumberOfInstances / this.state.pageSize) - (this.state.totalNumberOfInstances % this.state.pageSize)}
                                onClick={this.handleClickPage.bind(this)}
                                key="InstancesTablePagination"
                            />
                        </div>
                        <div className="col-4"></div>
                    </div>
                    </div>
                )
            }
            else return <div className="container">No Instances</div>
        }
        else return (
            <Spinner />
        )
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-11">
                            <h4>View Instances of {this.state.classModel}</h4> 
                        </div>
                        <div className="col-1">
                        </div>
                    </div>
                </div>
                {this.renderInstancesTable()}
            </div>
        );
    }
}

export { ViewInstances as default }