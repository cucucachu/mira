import React from 'react';

import ClassModel from './ClassModel';

function ClassModelList(props) {
    return (
        <div className="container">
            { props.classModels.map(c => (
                <ClassModel 
                    onClick={props.onClick} 
                    className={c}
                    key={c}
                />
                
            )) }
        </div>
    );
}

export { ClassModelList as default }