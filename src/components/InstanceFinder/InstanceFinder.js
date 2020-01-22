import React, { Component } from 'react';

import InstanceSearchBar from './InstanceSearchBar';
import SelectedInstancesList from './SelectedInstancesList';
import InstanceList from './InstanceList';
import VerticalPad from '../Common/VerticalPad';

class InstanceFinder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instances: [],
            schema: {
                attributes: []
            },
            searchText: '',
            loaded: false,
        }
    }

    async fetchSchema() {
        const response = await fetch('http://localhost:8000/mira/' + this.props.relationship.toClass);
        return response.json();
    }

    async fetchInstances(filter={}) {
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                className: this.props.relationship.toClass,
                filter,
                pageSize: 10,
            }),
        }

        const response = await fetch('http://localhost:8000/mira/getInstances', postRequest)
        return response.json();
    }

    async loadSchema() {
        const schema = await this.fetchSchema();

        const state = {};
        Object.assign(state, this.state);
        state.schema = schema;
        this.setState(state);
    }

    async loadInstances(filter) {
        const instancesPage = await this.fetchInstances(filter);

        const state = {};
        Object.assign(state, this.state);

        state.instances = instancesPage.instances;
        state.loaded = true;

        this.setState(state);
    }

    componentDidUpdate(newProps) {
        if (newProps.relationship !== this.props.relationship) {
            const state = {};
            Object.assign(state, this.state);
            state.filter = {};
            state.searchText = '';
            state.loaded = false;
            this.setState(state);

            this.loadSchema();
            this.loadInstances();
        }
    }

    handleChangeSearchText(event) {
        const state = {};
        Object.assign(state, this.state);
        state.searchText = event.target.value;
        this.setState(state);
    }

    handleClickSearchButton() {
        const filter = {};
        const regex = '.*' + this.state.searchText + '.*';

        if (this.state.searchText !== '') {
            filter['$or'] = [];
            filter['$or'].push({
                _id: 'ObjectId(' + this.state.searchText + ')',
            });

            for (const attribute of this.state.schema.attributes) {
                filter['$or'].push({
                    [attribute.name]: {
                        $regex : regex,
                    }
                });
            }
        }

        const state = {};
        Object.assign(state, this.state);
        state.loaded = false;
        this.setState(state);

        this.loadInstances(filter);
    }

    handleClickRemoveInstance(instance) {
        this.props.removeInstanceFromSelectedInstances(instance);
    }

    handleClickInstance(instance) {
        const selectedInstancesContainsInstance = this.props.selectedInstances.filter(i => i.id === instance.id).length > 0;

        if (!selectedInstancesContainsInstance) {
            this.props.addInstanceToSelectedInstances(instance);
        }
    }

    render() {
        return (
            <div className="modal fade" id="instance-selector-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Select {this.props.relationship.name}</h5>
                            <button type="button" className="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <SelectedInstancesList
                                selectedInstances={this.props.selectedInstances}
                                onClickRemoveInstance={this.handleClickRemoveInstance.bind(this)}
                            />
                            <VerticalPad />
                            <InstanceSearchBar
                                searchText={this.state.searchText}
                                onChangeSearchText={this.handleChangeSearchText.bind(this)}
                                onClickSearchButton={this.handleClickSearchButton.bind(this)} 
                            />
                            <VerticalPad />
                            <InstanceList
                                instances={this.state.instances}
                                loaded={this.state.loaded}
                                onClick={this.handleClickInstance.bind(this)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={this.props.onClickInstancesSelected}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export { InstanceFinder as default }