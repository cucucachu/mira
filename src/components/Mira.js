import React from 'react';
import ClassModelList from './ClassModelList';


class Mira extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'ClassModels',
        }
    }

    //LifeCycle
    componentDidMount() {
    }

    // Handlers
    handleClassModelClick(classModel) {
        const state = {};
        Object.assign(state, this.state);

        state.currentState = 'ViewInstances';
        state.classModel = classModel;

        this.setState(state);
    }

    // Rendering
    renderClassModels() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <h4>ClassModels</h4>
                        </div>
                    </div> 
                </div>
                <div>
                    <ClassModelList 
                        onClick={this.handleClassModelClick.bind(this)}
                    />
                </div>
            </div>
        );
    }

    render() {
        switch(this.state.currentState) {

            case 'ClassModels':
                return this.renderClassModels();
            case 'ViewInstances':
                return (
                    <div className="container">ViewInstances for Class Model: {this.state.classModel} </div>
                );
            case 'ViewInstance':
                return (
                    <div>ViewInstance</div>
                );
            case 'EditInstance':
                return (
                    <div>EditInstance</div>
                );
            default:
                return (
                    <div>Invalid State: {this.state.currentState}</div>
                )
        }
    }
}

export { Mira as default }