import React from 'react';

function InstanceLink(props) {
    if (props.instance) {
        return (
            <a href="#root" onClick={() => props.onClick(props.instance)}>{props.instance.displayAs}</a>
        )
    }
    else {
        return (
            <p></p>
        )
    }
}

export { InstanceLink as default }