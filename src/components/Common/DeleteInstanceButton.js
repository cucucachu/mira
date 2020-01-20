import React from 'react';

function DeleteInstanceButton(props) {
    return <button className="btn btn-danger btn-sm" onClick={() => props.onClick(props.instance)}>Delete</button>
}

export { DeleteInstanceButton as default }