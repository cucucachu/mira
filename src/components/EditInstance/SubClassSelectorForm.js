import React from 'react';

function SubClassSelectorForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <div className="form-group">
                <label><strong>Sub-Class</strong></label>
                <select 
                    className="form-control"
                    value={props.value}
                    onChange={props.onChange}
                >
                    { 
                        props.subClasses.map(c => {
                            return (
                                <option 
                                    key={"SubClassSelectorOption:" + c}
                                    value={c}
                                >{c}</option>
                            )
                        })
                    }
                </select>
            </div>
            <button type="submit" className="btn btn-sm btn-primary">Select</button>
        </form>
    )
}

export default SubClassSelectorForm;