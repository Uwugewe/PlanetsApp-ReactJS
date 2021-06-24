import React, { Component } from "react";
import './GetPlanetsData.css';
import logo from './logo.svg';
import ShowPlanetsData from "./ShowPlanetsData";
import Pagination from './Pagination';
import Loader from "react-loader-spinner";
import axios from 'axios';

class GetPlanetsData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonFlag: false,
            planetsData: [],
            currentPage: 1,
            prevLink: '',
            nextLink: '',
            firstPage: 'https://swapi.dev/api/planets',
            count: '',
            sortedNames: [],
            sortedData: [],
            sortFlag: false
        }
    }

    pageCountNext = () => {
        this.setState(state => {
            return ({ currentPage: state.currentPage + 1 })
        });
    }

    pageCountPrev = () => {
        this.setState(state => {
            return ({ currentPage: state.currentPage - 1 })
        });
    }

    getSpaceData = (link) => {
        axios.get(link)
            .then(res => {
                console.log(res);
                this.setState(state => {
                    return ({
                        planetsData: res.data.results,
                        prevLink: res.data.previous,
                        nextLink: res.data.next,
                        count: res.data.count
                    })
                });
            });
    }

    changeButtonFlag = () => {
        this.setState(state => {
            return ({ buttonFlag: !state.buttonFlag });
        });
    }

    clearData = () => {
        this.setState(state => {
            return ({ 
                planetsData: [],
                currentPage: 1
            })
        });
    }

    filterByName = () => {
        this.myInput.current.value = this.myInput.current.value.trim().charAt(0).toUpperCase() + this.myInput.current.value.slice(1).toLowerCase();
        if (this.myInput.current.value.length > 1) {
            this.setState(() => {
                let newFilteredArr = this.props.PlanetsData.filter(obj => {
                    return (obj.name.includes(this.myInput.current.value))
                });
                return ({ filtered: newFilteredArr })
            })
        } else {
            this.setState({ filteredIDs: [] })
        }
    }

    alphabeticalSortNames = () => {
        this.setState(state => {
            let sortedNamesArr = [];

            for (let obj of this.state.planetsData) {
                sortedNamesArr.push(obj.name);
                sortedNamesArr.sort();
            }
            return ({ sortedNames: sortedNamesArr })
        });
    }

    alphabeticalSortData = () => {
        this.setState(state => {
            let sortItem = [];
            let sortedArrs = [];
            let sortedArr = [];

            this.state.sortedNames.forEach(name => {
                sortItem = this.state.planetsData.filter(obj => {
                    return (obj.name.includes(name))
                });
                sortedArrs.push(sortItem);
            });

            sortedArrs.forEach(obj => {
                obj.forEach(elementInObj => {
                    sortedArr.push(elementInObj);
                });
            });
            return ({ sortedData: sortedArr,
                sortFlag: !state.sortFlag 
            })
        });
    }

    resetSortFlag = () => {
        this.setState(() => {
            return({sortFlag: false})
        });
    }

    render() {
        let mountShowData = '';
        let backButton = '';
        let nextButton = '';
        let prevButton = '';
        let showSortButton = '';

        //mountShowData
        if (!this.state.buttonFlag) {
            mountShowData = (
                <div>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Get planets data!</h1>
                    <button onClick={() => {
                        setTimeout(() => {
                            this.changeButtonFlag();
                            this.getSpaceData(this.state.firstPage);
                        }, 0);
                    }}>Click here</button>
                </div>
            )
        } else if(this.state.planetsData.length !== 0){
            mountShowData = (
                <div>
                    <Pagination CurrentPage={this.state.currentPage} Count={this.state.count} />
                    <ShowPlanetsData PlanetsData={this.state.planetsData} SortedPlanetsData={this.state.sortedData} SortFlag={this.state.sortFlag} TensNumber={this.state.currentPage} />
                </div>
            );
        } else {
            mountShowData = (
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            )
        }

        //backButton
        if (this.state.buttonFlag) {
            backButton = (
                <button className="button-back" onClick={() => {
                    this.changeButtonFlag();
                    this.resetSortFlag();
                    this.clearData();
                }}>Back</button>
            );
        } else {
            backButton = '';
        }

        //nextButton
        if (this.state.nextLink !== null && this.state.buttonFlag) {
            nextButton = (
                <button className='button-next' onClick={() => {
                    this.resetSortFlag();
                    this.getSpaceData(this.state.nextLink);
                    this.pageCountNext();
                }}>&#8594;</button>
            );
        } else {
            nextButton = '';
        }

        //prevButton
        if (this.state.prevLink !== null && this.state.buttonFlag) {
            prevButton = (
                <button className='button-prev' onClick={() => {
                    this.resetSortFlag();
                    this.getSpaceData(this.state.prevLink);
                    this.pageCountPrev();
                }}>&#8592;</button>
            );
        } else {
            prevButton = '';
        }

        //sortButton
        if (this.state.sortFlag && this.state.buttonFlag) {
            showSortButton = (
                <button className='sort-button-active' onClick={() => {
                    setTimeout(() => {
                        this.alphabeticalSortNames();
                        this.alphabeticalSortData();
                    });
                }}>Alphabetical sort</button>
            );
        } else if (!this.state.sortFlag && this.state.buttonFlag){
            showSortButton = (
                <button className='sort-button' onClick={() => {
                    setTimeout(() => {
                        this.alphabeticalSortNames();
                        this.alphabeticalSortData();
                    });
                }}>Alphabetical sort</button>
            );
        } else {
            showSortButton = '';
        }
        

        return (
            <section className='main-section'>
                <div className='buttons-row'>
                    {nextButton}
                    {prevButton}
                    {backButton}
                </div>
                {showSortButton}
                {mountShowData}
            </section>
        )
    }
}

export default GetPlanetsData