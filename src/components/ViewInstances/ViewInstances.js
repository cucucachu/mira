import React, { Component } from 'react';

import InstancesTable from './InstancesTable';
import TablePagination from './TablePagination';
import Spinner from '../Common/Spinner';

import { fetchSchema, fetchInstances } from '../../miraBackend'; 

class ViewInstances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: {
                attributes: [],
                relationships: [],
            },
            filter: props.filter ? props.filter : {},
            orderBy: props.orderBy ? props.orderBy : { _id: 1 },
            sortButtonStates: {},
            instances: [],
            page: 1,
            pageSize: 10,
            totalNumberOfInstances: 0,
            loaded: false,
        };
    }

    newState() {
        const newState = {};
        Object.assign(newState, this.state);
        return newState;
    }

    async loadSchema() {
        const schema = await fetchSchema(this.props.classModel);
        
        const newState = this.newState();
        newState.schema = schema;
        this.setState(newState);
    }

    async loadInstances(page=this.state.page, orderBy=this.state.orderBy) {
        let newState = this.newState();
        newState.loaded = false;
        this.setState(newState);

        const response = await fetchInstances(this.props.classModel, this.state.filter, page-1, this.state.pageSize, orderBy);

        newState = this.newState();
        Object.assign(newState, {
            instances: response.instances,
            page: response.page + 1,
            pageSize: response.pageSize,
            totalNumberOfInstances: response.totalNumberOfInstances,
            orderBy,
            sortButtonStates: this.sortButtonStatesFromOrderBy(orderBy),
            loaded: true,
        });
        this.setState(newState);
    }

    async loadPage() {
        await this.loadSchema();
        this.sortButtonStatesFromOrderBy();
        await this.loadInstances();
    }

    // LifeCycle methods
    componentDidMount() {
        this.loadPage();
    }

    sortButtonStatesFromOrderBy(orderBy={_id: 1}) {
        const schema = this.state.schema;
        const upSymbol = 9653;
        const downSymbol = 9663;
        const rightSymbol = 9657;

        const property = Object.keys(orderBy)[0];
        const direction = orderBy[property] === 1 ? 'down' : 'up';

        const sortButtonStates = {};

        if (property === '_id') {
            sortButtonStates._id = {
                state: direction,
                symbol: direction === 'up' ? upSymbol : downSymbol,
                property: '_id',
            };
        }
        else {
            sortButtonStates._id = {
                state: 'neutral',
                symbol: rightSymbol,
                property: '_id',
            };
        }
        for (const attribute of schema.attributes) {
            if (property === attribute.name) {
                sortButtonStates[attribute.name] = {
                    state: direction,
                    symbol: direction === 'up' ? upSymbol : downSymbol,
                    property: attribute.name,
                };
            }
            else {
                sortButtonStates[attribute.name] = {
                    state: 'neutral',
                    symbol: rightSymbol,
                    property: attribute.name,
                };
            }
        }
        for (const relationship of schema.relationships) {
            if (property === relationship.name) {
                sortButtonStates[relationship.name] = {
                    state: direction,
                    symbol: direction === 'up' ? upSymbol : downSymbol,
                    property: relationship.name,
                };
            }
            else {
                sortButtonStates[relationship.name] = {
                    state: 'neutral',
                    symbol: rightSymbol,
                    property: relationship.name,
                };
            }
        }
        return sortButtonStates;
    }

    // Event handlers
    handleClickPage(pageNumber) {
        console.log('clicked page ' + pageNumber);
        this.loadInstances(pageNumber);
    }

    handleClickSortButton(property) {
        const orderBy = this.state.orderBy;
        let newOrderBy = {_id: 1};

        const currentProperty = Object.keys(orderBy)[0];
        const currentDirection = orderBy[currentProperty];

        if (property === currentProperty) {
            if (currentDirection === 1) {
                newOrderBy = {[currentProperty] : -1}
            }
        }
        else {
            newOrderBy = {[property] : 1}
        }

        console.log(newOrderBy);

        this.loadInstances(1, newOrderBy);
    }

    // Render methods
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
            return (
                <div className="container">
                {this.renderInfo()}
                <InstancesTable 
                    classModel={this.props.classModel}
                    schema={this.state.schema}
                    instances={this.state.instances}
                    sortButtonStates={this.state.sortButtonStates}
                    onClickDeleteInstance={this.props.onClickDeleteInstance}
                    onClickViewInstance={this.props.onClickViewInstance}
                    onClickEditInstance={this.props.onClickEditInstance}
                    onClickSort={this.handleClickSortButton.bind(this)}
                    key="InstancesTable"
                />
                <div className="row justify-content-between">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <TablePagination
                            page={this.state.page}
                            totalInstances={this.state.instances.length}
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
                            <h4>View Instances of {this.props.classModel}</h4> 
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