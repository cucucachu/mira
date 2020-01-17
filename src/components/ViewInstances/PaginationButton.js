import React from 'react';

function PaginationButton(props) {
    const pageNumber = props.pageNumber;
    const symbol = props.symbol;
    const active = props.active;
    const onClick = props.onClick;
    const disabled = props.disabled;

    if (disabled) {
        return (
            <li className="page-item disabled">
                <a href="#instances-table" className="page-link">{symbol}</a>
            </li>
        )
    }
    else {
        if (active) {
            return (
                <li className="page-item active">
                    <a href="#instances-table" className="page-link">{symbol}</a>
                </li>
            )
        }
        else {
            return (
                <li className="page-item">
                    <a 
                        href="#instances-table" 
                        className="page-link" 
                        onClick={() => onClick(pageNumber)}
                    >
                            {symbol}
                    </a>
                </li>
            )
        }
    }

}

export { PaginationButton as default }