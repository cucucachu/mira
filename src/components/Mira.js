import React from 'react';

import Header from './Common/Header';
import ClassModelTable from './ClassModelTable/ClassModelTable';
import ViewInstances from './ViewInstances/ViewInstances';
import ViewInstance from './ViewInstance/ViewInstance';
import CreateInstance from './CreateInstance/CreateInstance';


class Mira extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'ClassModels',
            classModel: null,
            id: null,
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
        state.id = null;

        this.setState(state);
    }

    handleClickHome() {
        const state = {};
        Object.assign(state, this.state);
        state.currentState = 'ClassModels';
        state.classModel = null;
        state.id = null;

        this.setState(state);
    }

    handleClickViewInstance(instance) {
        console.log('Clicked "View" for instance ' + instance.displayAs);
        const state = {};
        Object.assign(state, this.state);
        state.currentState = 'ViewInstance';
        state.classModel = instance.className;
        state.id = instance.id;
        this.setState(state);
    }

    handleClickCreateInstance(classModel) {
        const state = {};
        Object.assign(state, this.state);
        state.currentState = 'CreateInstance'
        state.classModel = classModel;
        state.id = null;
        this.setState(state);
    }

    handleClickEditInstance(instance) {
        console.log('Clicked "Edit" for instance ' + instance.displayAs);
    }

    handleClickDeleteInstance(instance) {
        console.log('Clicked "Delete" for instance ' + instance.displayAs);
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
                        onClickCreateInstance={this.handleClickCreateInstance.bind(this)}
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

    renderViewInstance() {
        return (
            <div>
                <Header 
                    onClick={this.handleClickHome.bind(this)}
                />
                <ViewInstance
                    classModel={this.state.classModel}
                    id={this.state.id}
                    onClickViewInstances={this.handleClickClassModel.bind(this)}
                    onClickDeleteInstance={this.handleClickDeleteInstance.bind(this)}
                    onClickViewInstance={this.handleClickViewInstance.bind(this)}
                    onClickEditInstance={this.handleClickEditInstance.bind(this)}
                />
            </div>
        )
    }

    renderCreateInstance() {
        return (
            <div>
                <Header 
                    onClick={this.handleClickHome.bind(this)}
                />
                <CreateInstance
                    classModel={this.state.classModel}
                    id={this.state.id}
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
                return this.renderViewInstance();
            case 'CreateInstance':
                return this.renderCreateInstance();
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