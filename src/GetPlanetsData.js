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
            count: ''
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

    render() {
        let mountShowData = '';
        let backButton = '';
        let nextButton = '';
        let prevButton = '';

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
                    <ShowPlanetsData PlanetsData={this.state.planetsData} TensNumber={this.state.currentPage} />
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
                    this.getSpaceData(this.state.prevLink);
                    this.pageCountPrev();
                }}>&#8592;</button>
            );
        } else {
            prevButton = '';
        }

        return (
            <section className='main-section'>
                <div className='buttons-row'>
                    {nextButton}
                    {prevButton}
                    {backButton}
                </div>
                {mountShowData}
            </section>
        )
    }
}

export default GetPlanetsData