import React, { Component } from 'react';

import PaginationButton from './PaginationButton';

class TablePagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: props.page,
            lastPage: props.lastPage,
            onClick: props.onClick,
        };
    }

    renderPageNumberButton(i) {
        if (i === this.state.page) {
            return (
                <li className="page-item active" key={'page-number-button-' + i}>
                    <a href="#instances-table" className="page-link">{i}</a>
                </li>
            )
        }
        else {
            return (
                <li className="page-item"  key={'page-number-button-' + i}>
                    <a 
                        href="#instances-table" 
                        className="page-link" 
                        onClick={() => this.state.onClick(i)}
                    >
                            {i}
                    </a>
                </li>
            )
        }
    }

    renderPagination() {
        const numberOfPagesBefore = 4;
        const numberOfPagesAfter = 4;
        const maxPages = 10;
        const pageButtons = [];

        // Add Previous Button
        if (this.state.page > 0) {
            pageButtons.push((
                <PaginationButton 
                    pageNumber={this.state.page - 1}
                    symbol="&laquo;"
                    active={false}
                    onClick={this.state.onClick}
                    key="PaginationButton:Previous"
                />
            ));
        }

        // Render first page button
        pageButtons.push(
            <PaginationButton 
                pageNumber={1}
                symbol={1}
                active={this.state.page === 1}
                onClick={this.state.onClick}
                key="PaginationButton:1"
            />
        );

        // Render middle page buttons
        if (this.state.lastPage < maxPages) {
            for (let i = 2; i < this.state.lastPage; i++) {
                pageButtons.push(
                    <PaginationButton 
                        pageNumber={i}
                        symbol={i}
                        active={this.state.page === i}
                        onClick={this.state.onClick}
                        key={'PaginationButton:' + i}
                    />
                );
            }
        }
        else {
            // render '...' before numbers.
            if (this.state.page > numberOfPagesBefore + 1) {
                pageButtons.push(
                    <PaginationButton 
                        disabled={true}
                        symbol="..."
                        key="PaginationButton:...Before"
                    />
                );
            }
            let i;
            for (i = this.state.page - numberOfPagesBefore; i < this.state.page + numberOfPagesAfter; i++) {
                if (i > 1 && i < this.state.lastPage) {
                    pageButtons.push(
                        <PaginationButton 
                            pageNumber={i}
                            symbol={i}
                            active={this.state.page === i}
                            onClick={this.state.onClick}
                            key={'PaginationButton:' + i}
                        />
                    );
                }
            }
            // render '...' after numbers.
            if (i < this.state.lastPage) {
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
        if (this.state.lastPage > 1) {
            pageButtons.push(
                <PaginationButton 
                    pageNumber={this.state.lastPage}
                    symbol={this.state.lastPage}
                    active={this.state.page === this.state.lastPage}
                    onClick={this.state.onClick}
                    key={'PaginationButton:' + this.state.lastPage}
                />
            );
        }

        // Next page button
        if (this.state.page < this.state.lastPage) {
            pageButtons.push((
                <PaginationButton 
                    pageNumber={this.state.page + 1}
                    symbol="&raquo;"
                    active={false}
                    onClick={this.state.onClick}
                    key="PaginationButton:Next"
                />
            ));
        }
        return pageButtons;
    }

    render() {
        return (
            <nav>
                <ul className="pagination">
                    {
                        this.renderPagination()
                    }
                </ul>
            </nav>
        );
    }
}

export { TablePagination as default }