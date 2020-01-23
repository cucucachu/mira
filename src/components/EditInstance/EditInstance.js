import React, { Component } from 'react';

import VerticalPad from '../Common/VerticalPad';
import InstanceFinder from '../InstanceFinder/InstanceFinder';
import Spinner from '../Common/Spinner';
import ErrorAlert from '../Common/ErrorAlert';
import InstanceEdit from './InstanceEdit';

import { fetchSchema, fetchInstance } from '../../publicSquare'; 

class EditInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: null,
            loaded: false,
            error: null,
            updatedInstance: {},
            instanceFinder: {
                relationship: {},
                selectedInstances: [],
            }
        }
    }

    transformUpdatedInstanceForPut() {
        const putData = {};
        Object.assign(putData, this.state.updatedInstance);

        for (const relationship of this.state.schema.relationships) {
            const value = putData[relationship.name];

            if (relationship.singular) {
                if (value !== null) {
                    putData[relationship.name] = value.id;
                }
            }
            else {
                putData[relationship.name] = value.map(i => i.id);
            }
        }

        console.log(JSON.stringify(putData, null, 2));

        return putData;
    }

    async putInstance() {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.transformUpdatedInstanceForPut()),
        }

        const response = await fetch('http://localhost:8000/mira/put', postData);
        return response.json();
    }

    // async fetchSchema() {
    //     const response = await fetch('http://localhost:8000/mira/' + this.props.classModel);
    //     return response.json();
    // }

    // async fetchInstance() {
    //     const postRequest = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             className: this.props.classModel,
    //             id: this.props.id,
    //         }),
    //     }

    //     const response = await fetch('http://localhost:8000/mira/get', postRequest)
    //     return response.json();
    // }

    isNumber(value) {
        return /[0-9]*\.?[0-9]*/g.test(value);
    }

    initUpdatedInstance(schema, instance=null) {
        const updatedInstance = {}
        const singularRelationships = schema.relationships.filter(r => r.singular);
        const nonSingularRelationships = schema.relationships.filter(r => !r.singular);

        if (instance === null) {
            updatedInstance.className = this.props.classModel;
            for (const attribute of schema.attributes) {
                if (attribute.type === 'Boolean') {
                    updatedInstance[attribute.name] = false;
                }
                else {
                    updatedInstance[attribute.name] = null;
                }
            }
            for (const relationship of singularRelationships) {
                updatedInstance[relationship.name] = null;
            }
            for (const relationship of nonSingularRelationships) {
                updatedInstance[relationship.name] = [];
            }
        }
        else {
            updatedInstance.className = this.props.classModel;
            updatedInstance.id = this.props.id;
            for (const attribute of schema.attributes) {
                updatedInstance[attribute.name] = instance[attribute.name] ? instance[attribute.name] : null;
            }
            for (const relationship of singularRelationships) {
                updatedInstance[relationship.name] = instance[relationship.name] ? instance[relationship.name] : null;
            }
            for (const relationship of nonSingularRelationships) {
                updatedInstance[relationship.name] = instance[relationship.name] ? instance[relationship.name] : [];
            }
        }

        return updatedInstance;
    }

    async loadSchema() {
        const schema = await fetchSchema(this.props.classModel);
        
        const state = {};
        Object.assign(state, this.state);
        state.schema = schema;
        if (!this.props.id) {
            state.loaded = true;
            state.updatedInstance = this.initUpdatedInstance(schema);
        }
        this.setState(state);
    }

    async loadInstance() {
        const instance = await fetchInstance(this.props.classModel, this.props.id);
        const state = {};
        Object.assign(state, this.state);
        state.loaded = true;
        state.updatedInstance = this.initUpdatedInstance(this.state.schema, instance);
        this.setState(state);
    }
    
    async load() {
        await this.loadSchema();

        if (this.props.id) {
            await this.loadInstance();
        }
    }

    componentDidMount() {
        this.load();
    }

    handleChangeAttribute(event, attribute) {
        const state = {};
        Object.assign(state, this.state);
        const updatedInstance = {};
        Object.assign(updatedInstance, this.state.updatedInstance);
        state.updatedInstance = updatedInstance;

        if (attribute.type === 'Boolean') {
            updatedInstance[attribute.name] = event.target.checked;
        }
        else if (attribute.type === 'Number') {
            if (!this.isNumber(event.target.value)) {
                return;
            }
            else {
                updatedInstance[attribute.name] = event.target.value.match(/[0-9]*\.?[0-9]*/g)[0];
            }
        }
        else {
            updatedInstance[attribute.name] = event.target.value;
        }

        this.setState(state);
    }

    handleRemoveInstanceFromSingularRelationship(relationship, instance) {
        console.log('Clicked remove instance ' + instance.displayAs + ' from ' + relationship.name + '.');
    }

    handleSelectSingularRelationship(relationship, instance) {
        const state = {};
        Object.assign(state, this.state);
        const updatedInstance = {};
        Object.assign(updatedInstance, this.state.updatedInstance);
        state.updatedInstance = updatedInstance;

        updatedInstance[relationship.name] = instance;

        this.setState(state);
    }

    handleSelectNonSingularRelationship(relationship, instance) {
        const state = {};
        Object.assign(state, this.state);
        const updatedInstance = {};
        Object.assign(updatedInstance, this.state.updatedInstance);
        state.updatedInstance = updatedInstance;

        if (!updatedInstance[relationship.name]) {
            updatedInstance[relationship.name] = [];
        }

        let nonSingularRelationship = Array.from(updatedInstance[relationship.name]);

        updatedInstance[relationship.name] = nonSingularRelationship;

        let instanceAlreadyInRelationship = false;
        for (const index in nonSingularRelationship) {
            const instanceInRelationship = nonSingularRelationship[index];
            if (instance.id === instanceInRelationship.id) {
                instanceAlreadyInRelationship = true;
                nonSingularRelationship = nonSingularRelationship.splice(index, 1);
            }
        }
        if (!instanceAlreadyInRelationship) {
            nonSingularRelationship.push(instance);
        }

        this.setState(state);
    }

    handleClickInstancesSelected() {
        const state = {};
        Object.assign(state, this.state);

        const relationship = this.state.instanceFinder.relationship;

        const updatedInstance = {};
        Object.assign(updatedInstance, state.updatedInstance);
        state.updatedInstance = updatedInstance;

        if (relationship.singular) {
            if (state.instanceFinder.selectedInstances.length > 0) {
                updatedInstance[relationship.name] = state.instanceFinder.selectedInstances[0];
            }
            else {
                updatedInstance[relationship.name] = null;
            }
        }
        else {
            updatedInstance[relationship.name] = state.instanceFinder.selectedInstances;
        }

        this.setState(state);
    }

    handleClickSubmit(event) {
        event.preventDefault();
        this.putInstance()
            .then(response => {
                if (response.error) {
                    const state = {};
                    Object.assign(state, this.state);
                    state.error = response.error;
                    this.setState(state);
                }
                else {
                    const instanceEdited = response.result[0];
                    this.props.onSuccessfulPut(instanceEdited);
                }
            }
        );
    }

    // Instance Finder Handlers

    handleClickFindInstance(relationship) {
        const state = {};
        Object.assign(state, this.state);
        const instanceFinder = {};
        Object.assign(instanceFinder, state.instanceFinder);
        state.instanceFinder = instanceFinder;
        instanceFinder.relationship = relationship;
        if (relationship.singular) {
            const selectedInstance = this.state.updatedInstance[relationship.name];
            if (selectedInstance === null) {
                instanceFinder.selectedInstances = [];
            }
            else {
                instanceFinder.selectedInstances = [this.state.updatedInstance[relationship.name]];
            }
        }
        else {
            instanceFinder.selectedInstances = this.state.updatedInstance[relationship.name];
        }

        this.setState(state);
    }

    handleAddInstanceToSelectedInstances(instance) {
        const state = {};
        Object.assign(state, this.state);
        const instanceFinder = {};
        Object.assign(instanceFinder, state.instanceFinder);
        state.instanceFinder = instanceFinder;
        const selectedInstances = Array.from(instanceFinder.selectedInstances);
        instanceFinder.selectedInstances = selectedInstances;

        if (this.state.instanceFinder.relationship.singular && this.state.instanceFinder.selectedInstances.length) {
            selectedInstances.splice(0, 1);
            selectedInstances.push(instance);
        }
        else {
            selectedInstances.push(instance);
        }
        this.setState(state);
    }

    handleRemoveInstanceFromSelectedInstances(instance) {
        const state = {};
        Object.assign(state, this.state);
        const instanceFinder = {};
        Object.assign(instanceFinder, state.instanceFinder);
        state.instanceFinder = instanceFinder;
        const selectedInstances = Array.from(instanceFinder.selectedInstances);
        instanceFinder.selectedInstances = selectedInstances;

        let removeIndex = null;
        for (const index in selectedInstances) {
            const selectedInstance = selectedInstances[index];
            if (selectedInstance.id === instance.id) {
                removeIndex = index;
                break;
            }
        }

        if (removeIndex !== null) {
            selectedInstances.splice(removeIndex, 1);
        }
        this.setState(state);
    }

    onClickPutInstance() {
        console.log('Clicked Put instance.');
    }

    renderLoading() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h4>Create Instance of { this.props.classModel }</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <Spinner />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoading();
        }
        else {
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <h4>Create Instance of { this.props.classModel }</h4>
                            </div>
                        </div>
                    </div>
                    <InstanceFinder
                        relationship={this.state.instanceFinder.relationship}
                        selectedInstances={this.state.instanceFinder.selectedInstances}
                        addInstanceToSelectedInstances={this.handleAddInstanceToSelectedInstances.bind(this)}
                        removeInstanceFromSelectedInstances={this.handleRemoveInstanceFromSelectedInstances.bind(this)}
                        onClickInstancesSelected={this.handleClickInstancesSelected.bind(this)}
                    />
                    <ErrorAlert 
                        message={this.state.error}
                    />
                    <VerticalPad />
                    <InstanceEdit
                        instance={this.state.instance}
                        updatedInstance={this.state.updatedInstance}
                        schema={this.state.schema}
                        onChangeAttribute={this.handleChangeAttribute.bind(this)}
                        onClickPutInstance={this.onClickPutInstance.bind(this)}
                        onSelectSingularRelationship={this.handleSelectSingularRelationship.bind(this)}
                        onSelectNonSingularRelationship={this.handleSelectNonSingularRelationship.bind(this)}
                        onClickSubmit={this.handleClickSubmit.bind(this)}
                        onClickFindInstance={this.handleClickFindInstance.bind(this)}
                        onClickRemoveInstance={this.handleRemoveInstanceFromSingularRelationship.bind(this)}
                    />
                </div>

            )
        }
    }
}

export { EditInstance as default }