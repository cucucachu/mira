import React, { Component } from 'react';

import InstanceLink from './InstanceLink';

class InstanceSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instances: props.instances,
        }
    }

    render() {
        if (this.state.instances) {
            return (
                <ul>
                    {
                        this.state.instances
                            .map(i => {
                                return (
                                    <li>
                                        <InstanceLink
                                            instance={i}
                                            key={this.key + 'InstanceLink:' + i.id}
                                        />
                                    </li>
                                )    
                            }
                        )
                    }
                </ul>
            )
        }
        else {
            return (
                <p></p>
            )
        }
    }
}

export { InstanceSet as default }