import React, { Component } from 'react';

import { fetchClassModels } from '../../publicSquare'; 
import ClassModelAsRow from './ClassModelAsRow';
import Spinner from '../Common/Spinner';

class ClassModelTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classModels: [],
            loaded: false,
        }
    }

    async loadClassModels() {
        const classModels = await fetchClassModels();
        
        const newState = {};
        Object.assign(newState, this.state);

        newState.classModels = classModels.sort();
        newState.loaded = true;
        this.setState(newState);
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
                                        onClickViewInstances={this.props.onClickViewInstances}
                                        onClickEditInstance={this.props.onClickEditInstance}
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