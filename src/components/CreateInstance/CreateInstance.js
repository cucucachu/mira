import React, { Component } from 'react';

import VerticalPad from '../Common/VerticalPad';
import Spinner from '../Common/Spinner';
import InstanceEdit from './InstanceEdit';

class CreateInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: null,
            instance: null,
            updatedInstance: {},
            loaded: false,
        }
    }

    async fetchSchema() {
        const response = await fetch('http://localhost:8000/mira/' + this.props.classModel);
        return response.json();
    }

    async fetchInstance() {
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                className: this.props.classModel,
                id: this.props.id,
            }),
        }

        const response = await fetch('http://localhost:8000/mira/get', postRequest)
        return response.json();
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

    isNumber(value) {
        return /[0-9]*\.?[0-9]*/g.test(value);
    }

    initUpdatedInstance(schema, instance=null) {
        const updatedInstance = {}
        const singularRelationships = schema.relationships.filter(r => r.singular);
        const nonSingularRelationships = schema.relationships.filter(r => !r.singular);

        if (instance === null) {
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

        return updatedInstance;
    }

    async loadSchema() {
        const schema = await this.fetchSchema();
        
        const newState = {};
        Object.assign(newState, this.state);
        newState.schema = schema;
        newState.loaded = true;
        newState.updatedInstance = this.initUpdatedInstance(schema);
        this.setState(newState);
    }

    async loadInstance() {
        const instance = await this.fetchInstance();
        const state = {};
        Object.assign(state, this.state);
        state.instance = instance;
        state.loaded = true;
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
                    <VerticalPad />
                    <InstanceEdit
                        instance={this.state.instance}
                        updatedInstance={this.state.updatedInstance}
                        schema={this.state.schema}
                        onChangeAttribute={this.handleChangeAttribute.bind(this)}
                        onClickPutInstance={this.onClickPutInstance.bind(this)}
                    />
                </div>

            )
        }
    }
}

export { CreateInstance as default }