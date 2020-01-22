import React from 'react';

import Spinner from '../Common/Spinner';

function InstanceList(props) {
    if (!props.loaded) {
        return <Spinner />
    }
    else {
        return (
            <div className="list-group">
                {
                    props.instances.map(instance => {
                        return (
                            <button 
                                className="list-group-item list-group-item-action"
                                key={ 'SelectInstanceButton-' + instance.id }
                                onClick={() => props.onClick(instance)}
                            >
                                { instance.displayAs }
                            </button>
                        )
                    })
                }
            </div>
        )
    }
}

export { InstanceList as default }