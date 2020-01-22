import React from 'react';

function InstanceSearchBar(props) {
    return (
        <div className="input-group">
            <input 
                type="text" 
                className="form-control" 
                placehoulder="Search"
                value={props.searchText}
                onChange={props.onChangeSearchText}>
            </input>
            <div className="input-group-append">
                <button 
                    className="btn btn-outline-primary" 
                    type="button"
                    onClick={props.onClickSearchButton}
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export { InstanceSearchBar as default }