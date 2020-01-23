import React, { Component } from 'react';

import Spinner from '../Common/Spinner';
import Instance from '../Instance/Instance';
import DeleteInstanceButton from '../Common/DeleteInstanceButton';
import EditInstanceButton from '../Common/EditInstanceButton';
import VerticalPad from '../Common/VerticalPad';

import { fetchSchema, fetchInstance } from '../../publicSquare'; 

class ViewInstance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            schema: {},
            instance: {},
            loaded: false,
        }
    }

    async loadSchema() {
        const schema = await fetchSchema(this.props.classModel);
        
        const newState = {};
        Object.assign(newState, this.state);
        newState.schema = schema;
        this.setState(newState);
    }

    async loadInstance() {
        const instance = await fetchInstance(this.props.classModel, this.props.id);
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
                            <div className="col-10">
                                <h4>View Instance {this.state.instance.displayAs}</h4>
                            </div>
                            <div className="col-2">
                                <EditInstanceButton
                                    instance={this.state.instance}
                                    onClick={this.props.onClickEditInstance} 
                                />
                                <DeleteInstanceButton
                                    instance={this.state.instance}
                                    onClick={this.props.onClickDeleteInstance} 
                                />
                            </div>
                        </div>
                    </div>
                    <VerticalPad />
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