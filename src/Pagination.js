import React, { Component } from "react";
import './Pagination.css';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPages: []
        }
    }

    componentDidMount() {
        console.log(this.props.Count);
            let pageCounter = 0;
            let pagesArr = [];
            for (let i = 1; i <= this.props.Count / 10; i++) {
                pageCounter += 1;
                pagesArr.push(pageCounter);
            }
        this.setState(state => {
            console.log(pagesArr);
            return ({ allPages: pagesArr })
        });
    }

    render() {
        console.log(this.props.Count);

        let pagination = this.state.allPages.map((pageNumber, index) => {
            if (index + 1 === this.props.CurrentPage) {
                return (
                    <div key={index + 1} id={index + 1} className='active pagination-item'>{pageNumber}</div>
                )
            } else {
                return (
                    <div key={index + 1} id={index + 1} className='pagination-item'>{pageNumber}</div>
                )
            }

        });

        return (
            <div>
                <div className='pagination'>
                    {pagination}
                </div>
            </div>
        )
    }
}

export default Pagination