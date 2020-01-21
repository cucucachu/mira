import React, { Component } from 'react';

import Spinner from '../Common/Spinner';
import InstanceSelectItem from './InstanceSelectItem';

class SingularRelationshipSelector extends Component {
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

    getSelectValue() {
        if (this.props.value === null) {
            return 0;
        }
        else {
            for (const index in this.state.instances) {
                if (this.props.value.id === this.state.instances[index].id) {
                    return Number(index) + 1;
                }
            }
            return 0;
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
                    <select 
                        className="form-control"
                        value={ this.getSelectValue() }
                        onChange={
                            (e) => 
                                this.props.onChange(
                                    this.props.relationship, 
                                    e.target.value > 0 ? this.state.instances[e.target.value-1] : null
                                )
                        }
                    >
                        <option value='0'>None</option>
                        {
                            this.state.instances.map((instance, index) =>
                                <InstanceSelectItem 
                                    instance={ instance }
                                    index={ index + 1 }
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

export { SingularRelationshipSelector as default }