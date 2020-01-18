import React, { Component } from 'react';

class ClassModelLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classModel: props.classModel,
            onClick: props.onClick,
        }
    }

    render() {
        if (this.state.classModel) {
            return (
                <a href="#root" onClick={() => this.state.onClick(this.state.classModel)}>{this.state.classModel}</a>
            )
        }
        else {
            return (
                <p></p>
            )
        }
    }
}

export { ClassModelLink as default }