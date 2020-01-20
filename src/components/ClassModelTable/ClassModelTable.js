import React, { Component } from 'react';

import ClassModelAsRow from './ClassModelAsRow';
import Spinner from '../Common/Spinner';

class ClassModelTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onClickViewInstances: props.onClickViewInstances,
            onClickCreateInstance: props.onClickCreateInstance,
            classModels: [],
            loaded: false,
        }
    }

    loadClassModels() {
        fetch('http://localhost:8000/mira/')
            .then(response => response.json())
            .then(classModels => {
                const newState = {};
                Object.assign(newState, this.state);

                newState.classModels = classModels.sort();
                newState.loaded = true;
                this.setState(newState);
            }
            ).catch(error => console.log(error.message));
    }

    componentDidMount() {
        this.loadClassModels();
    }

    render() {
        if (this.state.loaded) {
            return (
                <table className="table table-striped table-bordered table-hover table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ClassModel</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            this.state.classModels.map(c => {
                                return (
                                    <ClassModelAsRow 
                                        classModel={c}
                                        onClickViewInstances={this.state.onClickViewInstances}
                                        onClickCreateInstance={this.state.onClickCreateInstance}
                                        key={'ClassModelAsRow:' + c}
                                    />
                                );
                            })
                        }
                    </tbody>
                </table>
            );
        }
        else {
            return <Spinner />;
        }

    }
}

export { ClassModelTable as default }