import React from 'react';

import Header from './Common/Header';
import ClassModelTable from './ClassModelTable/ClassModelTable';
import ViewInstances from './ViewInstances/ViewInstances';
import ViewInstance from './ViewInstance/ViewInstance';
import EditInstance from './EditInstance/EditInstance';

import { fetchDelete } from '../miraBackend';


class Mira extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'ClassModels',
            classModel: null,
            deletedMessage: null,
            id: null
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
        state.deletedMessage = null;

        this.setState(state);
    }

    handleClickHome() {
        const state = {};
        Object.assign(state, this.state);
        state.currentState = 'ClassModels';
        state.classModel = null;
        state.id = null;
        state.deletedMessage = null;

        this.setState(state);
    }

    handleClickViewInstance(instance) {
        console.log('Clicked "View" for instance ' + instance.displayAs);
        const state = {};
        Object.assign(state, this.state);
        state.currentState = 'ViewInstance';
        state.classModel = instance.className;
        state.id = instance.id;
        state.deletedMessage = null;
        this.setState(state);
    }

    handleClickEditInstance(classModel, id=null) {
        const state = {};
        Object.assign(state, this.state);
        state.currentState = 'EditInstance'
        state.classModel = classModel;
        state.id = id;
        state.deletedMessage = null;
        this.setState(state);
    }

    handleClickDeleteInstance(instance) {
        console.log('Clicked "Delete" for instance ' + instance.displayAs);
        fetchDelete(instance.className, instance.id)
            .then(() => {
                const state = {};
                Object.assign(state, this.state);
                state.deletedMessage = 'Deleted Instance ' + instance.id;
                state.currentState = 'ViewInstances';
                this.setState(state);
            }
        )
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
                        onClickEditInstance={this.handleClickEditInstance.bind(this)}
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
                    deletedMessage={this.state.deletedMessage}
                    onClickDeleteInstance={this.handleClickDeleteInstance.bind(this)}
                    onClickViewInstance={this.handleClickViewInstance.bind(this)}
                    onClickEditInstance={this.handleClickEditInstance.bind(this)}
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

    renderEditInstance() {
        return (
            <div>
                <Header 
                    onClick={this.handleClickHome.bind(this)}
                />
                <EditInstance
                    classModel={this.state.classModel}
                    id={this.state.id}
                    onSuccessfulPut={this.handleClickViewInstance.bind(this)}
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
            case 'EditInstance':
                return this.renderEditInstance();
            default:
                return (
                    <div>Invalid State: {this.state.currentState}</div>
                )
        }
    }
}

export { Mira as default }