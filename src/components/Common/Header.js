import React from 'react';

function Header(props) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                    <nav className="navbar navbar-dark bg-dark">
                        <a className="navbar-brand" href="#root" onClick={props.onClick}>Mira</a>
                    </nav>
                </div>
            </div>
            <br />
        </div>
    )
}

export { Header as default }