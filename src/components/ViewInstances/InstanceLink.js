import React, { Component } from 'react';

class InstanceLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instance: props.instance,
            onClick: () => console.log('clicked instance ' + props.instance.displayAs),
        }
    }

    render() {
        if (this.state.instance) {
            return (
                <a href="#root" onClick={this.state.onClick}>{this.state.instance.displayAs}</a>
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