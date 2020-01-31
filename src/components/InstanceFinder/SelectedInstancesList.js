import React from 'react';

function SelectedInstancesList(props) {
    return (
        <div> 
            <strong>Instances Selected:</strong>
            <ul className="list-group">
                {
                    props.selectedInstances.map(instance => {
                        return (
                            <li 
                                className="list-group-item" 
                                key={'SelectedInstancesList:Instance:' + (instance.id ? instance.id : instance.tempId)
                            }>
                                <div className="row">
                                    <div className="col-11">
                                        {instance.displayAs}
                                    </div>
                                    <div className="col-1">
                                        <button 
                                            type="close"
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => props.onClickRemoveInstance(instance)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}


export { SelectedInstancesList as default }