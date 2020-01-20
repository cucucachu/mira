import React from 'react';

import CreateInstanceButton from '../Common/CreateInstanceButton';
import ClassModelLink from './ClassModelLink';

function ClassModelAsRow(props) {
    return (
        <tr>
            <td>
                <div className="row">
                    <div className="col-11">
                        <ClassModelLink
                            classModel={props.classModel}
                            onClick={props.onClickViewInstances}
                        />
                        
                    </div>
                    <div className="col-1">
                        <CreateInstanceButton
                            classModel={props.classModel}
                            onClick={props.onClickCreateInstance}
                        />
                        
                    </div>
                </div>
            </td>
        </tr>
    );
}

export {ClassModelAsRow as default}