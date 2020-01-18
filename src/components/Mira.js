import React from 'react';

import Header from './Header';
import ClassModelTable from './ClassModelTable/ClassModelTable';
import ViewInstances from './ViewInstances/ViewInstances';


class Mira extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'ClassModels',
            classModel: null,
        }
    }

    //LifeCycle
    componentDidMount() {
    }

    // Handlers
    handleClickClassModel(classModel) {
        const state = {};
        Object.assign(state, this.state);

        state.currentState = 'ViewInstances';
        state.classModel = classModel;

        this.setState(state);
    }

    handleClickHome() {
        const state = {};
        Object.assign(state, this.state);
        state.currentState = 'ClassModels';

        this.setState(state);
    }

    handleClickDeleteInstance(instance) {
        console.log('Clicked "Delete" for instance ' + instance.displayAs);
    }

    handleClickViewInstance(instance) {
        console.log('Clicked "View" for instance ' + instance.displayAs);
    }

    handleClickCreateInstance(classModel) {
        console.log('Clicked "Create Instance" for classModel ' + classModel);
    }
    
    // Rendering
    renderClassModelTable() {
        return (
            <div>
                <Header 
                    onClick={this.handleClickHome.bind(this)}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <h4>ClassModels</h4>
                        </div>
                    </div> 
                </div>
                <div className="container">
                    <ClassModelTable 
                        onClickViewInstances={this.handleClickClassModel.bind(this)}
                        onClickCreateInstance={this.handleClickCreateInstance}
                    />
                </div>
            </div>
        );
    }

    renderViewInstances() {
        return (
            <div>
                <Header 
                    onClick={this.handleClickHome.bind(this)}
                />
                <ViewInstances 
                    classModel={this.state.classModel}
                    onClickDeleteInstance={this.handleClickDeleteInstance.bind(this)}
                    onClickViewInstance={this.handleClickViewInstance.bind(this)}
                    onClickCreateInstance={this.handleClickCreateInstance.bind(this)}
                />
            </div>
        )
    }

    render() {
        switch(this.state.currentState) {

            case 'ClassModels':
                return this.renderClassModelTable();
            case 'ViewInstances':
                return this.renderViewInstances();
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