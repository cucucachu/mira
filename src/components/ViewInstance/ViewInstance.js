import React, { Component } from 'react';

import Spinner from '../Common/Spinner';
import Instance from '../Instance/Instance';

class ViewInstance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            schema: {},
            instance: {},
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

    async loadSchema() {
        const schema = await this.fetchSchema();
        
        const newState = {};
        Object.assign(newState, this.state);
        newState.schema = schema;
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
        await this.loadInstance();
    }

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(newProps) {
        if (newProps.id !== this.props.id) {
            const state = {};
            Object.assign(state, this.state);
            Object.assign(state, {
                schema: {},
                instance: {},
                loaded: false,
            });
            this.setState(state);

            this.load();
        }
    }

    renderLoading() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h4>Loading instance of { this.props.classModel }</h4>
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
        if (this.state.loaded) {
            return (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <h4>View Instance {this.state.instance.displayAs}</h4>
                            </div>
                        </div>
                    </div>
                    <Instance
                        instance={this.state.instance}
                        schema={this.state.schema}
                        onClickViewInstance={this.props.onClickViewInstance}
                        onClickViewInstances={this.props.onClickViewInstances}
                    />
                </div>
            )
        }
        else {
            return this.renderLoading();
        }
    }
}

export { ViewInstance as default }