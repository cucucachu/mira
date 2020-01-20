import React from 'react';

import InstanceLink from './InstanceLink';

function InstanceSet(props) {
    if (props.instances) {
        return (
            <ul>
                {
                    props.instances
                        .map(i => {
                            return (
                                <li
                                key={this.key + 'InstanceLinkLi:' + i.id}>
                                    <InstanceLink
                                        instance={i}
                                        onClick={props.onClickViewInstance}
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

export { InstanceSet as default }