import React from 'react';

import PaginationButton from './PaginationButton';

function TablePagination(props) {
    if (props.totalInstances > 0) {
        return (
            <nav>
                <ul className="pagination">
                    {
                        renderPagination(props)
                    }
                </ul>
            </nav>
        );
    }
    else return <div></div>
}

function renderPagination(props) {
    const numberOfPagesBefore = 4;
    const numberOfPagesAfter = 4;
    const maxPages = 10;
    const pageButtons = [];

    // Add Previous Button
    if (props.page > 0) {
        pageButtons.push((
            <PaginationButton 
                pageNumber={props.page - 1}
                symbol="&laquo;"
                active={false}
                onClick={props.onClick}
                key="PaginationButton:Previous"
            />
        ));
    }

    // Render first page button
    pageButtons.push(
        <PaginationButton 
            pageNumber={1}
            symbol={1}
            active={props.page === 1}
            onClick={props.onClick}
            key="PaginationButton:1"
        />
    );

    // Render middle page buttons
    if (props.lastPage < maxPages) {
        for (let i = 2; i < props.lastPage; i++) {
            pageButtons.push(
                <PaginationButton 
                    pageNumber={i}
                    symbol={i}
                    active={props.page === i}
                    onClick={props.onClick}
                    key={'PaginationButton:' + i}
                />
            );
        }
    }
    else {
        // render '...' before numbers.
        if (props.page > numberOfPagesBefore + 1) {
            pageButtons.push(
                <PaginationButton 
                    disabled={true}
                    symbol="..."
                    key="PaginationButton:...Before"
                />
            );
        }
        let i;
        for (i = props.page - numberOfPagesBefore; i < props.page + numberOfPagesAfter; i++) {
            if (i > 1 && i < props.lastPage) {
                pageButtons.push(
                    <PaginationButton 
                        pageNumber={i}
                        symbol={i}
                        active={props.page === i}
                        onClick={props.onClick}
                        key={'PaginationButton:' + i}
                    />
                );
            }
        }
        // render '...' after numbers.
        if (i < props.lastPage) {
            pageButtons.push(
                <PaginationButton 
                    disabled={true}
                    symbol="..."
                    key="PaginationButton:After..."
                />
            );
        }
    }


    // Render last page button
    if (props.lastPage > 1) {
        pageButtons.push(
            <PaginationButton 
                pageNumber={props.lastPage}
                symbol={props.lastPage}
                active={props.page === props.lastPage}
                onClick={props.onClick}
                key={'PaginationButton:' + props.lastPage}
            />
        );
    }

    // Next page button
    if (props.page < props.lastPage) {
        pageButtons.push((
            <PaginationButton 
                pageNumber={props.page + 1}
                symbol="&raquo;"
                active={false}
                onClick={props.onClick}
                key="PaginationButton:Next"
            />
        ));
    }
    return pageButtons;
}

export { TablePagination as default }