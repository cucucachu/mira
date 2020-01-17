import React, { Component } from 'react';

import ClassModel from './ClassModel';

class ClassModelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onClick: props.onClick,
            classModels: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/mira/')
            .then(response => response.json())
            .then(classModels => {
                this.setState({ classModels: classModels.sort() })
            }
            ).catch(error => console.log(error.message));
    }

    render() {
        return (
            <div className="container">
                { this.state.classModels.map(c => (
                    <ClassModel 
                        onClick={this.state.onClick} 
                        className={c}
                        key={c}
                    />
                    
                )) }
            </div>
        );

    }
}

export { ClassModelList as default }