import React, { Component } from 'react';

class InstanceLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instance: props.instance,
            onClick: props.onClick,
        }
    }

    render() {
        if (this.state.instance) {
            return (
                <a href="#root" onClick={() => this.state.onClick(this.state.instance)}>{this.state.instance.displayAs}</a>
            )
        }
        else {
            return (
                <p></p>
            )
        }
    }
}

export { InstanceLink as default }