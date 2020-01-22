import React, { Component } from 'react';

import Spinner from '../Common/Spinner';
import InstanceSelectItem from './InstanceSelectItem';

class NonSingularRelationshipSelector extends Component {
    constructor (props) {
        super(props);
        this.state = {
            instances: [],
            loaded: false,
        }
    }

    async fetchInstances() {
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                className: this.props.classModel,
                pageSize: 100,
            }),
        }

        const response = await fetch('http://localhost:8000/mira/getInstances', postRequest)
        return response.json();
    }

    async loadInstances() {
        const result = await this.fetchInstances();
        const instances = result.instances;

        const state = {};
        Object.assign(state, this.state);
        state.instances = instances;
        state.loaded = true;
        this.setState(state);
    }

    componentDidMount() {
        this.loadInstances();
    }

    getSelectValues() {
        const selected = [];

        if (this.props.value === null) {
            return [0];
        }
        else {
            for (const index in this.state.instances) {
                if (this.props.value.id === this.state.instances[index].id) {
                    selected.push(Number(index) + 1);
                }
            }
            return selected;
        }
    }

    render() {
        if (!this.state.loaded) {
            return (
                <div>
                    <label>
                        <strong>{ this.props.relationship.name }</strong>
                    </label>
                    <Spinner />
                </div>
            )
        }
        else {
            return (
                <div className="form-group">
                    <label>
                        <strong>{ this.props.relationship.name }</strong>
                    </label>
                    <select multiple
                        className="form-control"
                        value={ this.getSelectValues() }
                        onChange={
                            (e) => 
                                this.props.onChange(
                                    this.props.relationship, 
                                    this.state.instances[e.target.value]
                                )
                        }
                    >
                        {
                            this.state.instances.map((instance, index) =>
                                <InstanceSelectItem 
                                    instance={ instance }
                                    index={ index }
                                    key={ 'InstanceSeletItem.' + this.props.relationship + '.' + instance.id }
                                />
                            )
                        }
                    </select>
                </div>
            )
        }
    }
}

export { NonSingularRelationshipSelector as default }