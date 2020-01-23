import React from 'react';

function InstanceSelectItem(props) {
    return (
        <option value={ props.index }>
            { props.instance.displayAs }
        </option>
    )
}

export { InstanceSelectItem as default }