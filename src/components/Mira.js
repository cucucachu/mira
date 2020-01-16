import React from 'react';

class Mira extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'ClassModels',
        }
    }

    render() {
        switch(this.state.currentState) {

            case 'ClassModels': 
                return (
                    <div>ClassModels</div>
                );
            case 'ViewInstances':
                return (
                    <div>ViewInstances</div>
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