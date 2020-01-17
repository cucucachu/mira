import React, { Component } from 'react';

class TablePages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: props.page,
            lastPage: props.lastPage,
        };
    }

    renderPageNumberButton(i) {
        if (i === this.state.page + 1) {
            return (
                <li className="page-item active">
                    <a href="#instances-table" className="page-link">{i}</a>
                </li>
            )
        }
        else {
            return (
                <li className="page-item">
                    <a href="#instances-table" className="page-link">{i}</a>
                </li>
            )
        }
    }

    renderPagination() {
            const pageButtons = [];

            if (this.state.page > 0) {
                pageButtons.push((
                    <li className="page-item">
                        <a href="#instances-table" className="page-link">Previous</a>
                    </li>
                ));
            }
            pageButtons.push(this.renderPageNumberButton(1));

            if (this.state.lastPage < 10) {
                for (let i = 2; i < this.state.lastPage; i++) {
                    pageButtons.push(this.renderPageNumberButton(i));
                }
            }
            else {
                let i;
                for (i = this.state.page -4; i < this.state.page + 5; i++) {
                    if (i > 1 && i < this.state.lastPage + 1) {
                        pageButtons.push(this.renderPageNumberButton(i));
                    }
                }
                if (i < this.state.lastPage) {
                    pageButtons.push((
                        <li className="page-item disabled">
                            <a href="#instances-table" className="page-link">...</a>
                        </li>
                    ));
                }
            }

            if (this.state.lastPage > 1) {
                pageButtons.push(this.renderPageNumberButton(this.state.lastPage));
            }

            if (this.state.page < this.state.lastPage) {
                pageButtons.push((
                    <li className="page-item">
                        <a href="#instances-table" className="page-link">Next</a>
                    </li>
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

export { TablePages as default }