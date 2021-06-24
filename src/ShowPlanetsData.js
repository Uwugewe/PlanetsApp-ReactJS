import React, { Component } from 'react';
import './ShowPlanets.css';

class ShowPlanetsData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
            // sortedNames: [],
            // sortedData: [],
            // sortFlag: false
        }
        this.myInput = React.createRef();
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

    // alphabeticalSortNames = () => {
    //     this.setState(state => {
    //         let sortedNamesArr = [];

    //         for (let obj of this.props.PlanetsData) {
    //             sortedNamesArr.push(obj.name);
    //             sortedNamesArr.sort();
    //         }
    //         return ({ sortedNames: sortedNamesArr })
    //     });
    // }

    // alphabeticalSortData = () => {
    //     this.setState(state => {
    //         let sortItem = [];
    //         let sortedArrs = [];
    //         let sortedArr = [];

    //         this.state.sortedNames.forEach(name => {
    //             sortItem = this.props.PlanetsData.filter(obj => {
    //                 return (obj.name.includes(name))
    //             });
    //             sortedArrs.push(sortItem);
    //         });

    //         sortedArrs.forEach(obj => {
    //             obj.forEach(deeper => {
    //                 console.log(deeper);
    //                 sortedArr.push(deeper);
    //             });
    //         });
    //         return ({ sortedData: sortedArr,
    //             sortFlag: !state.sortFlag 
    //         })
    //     });
    // }

    render() {
        let showPlanetsData = '';
        // let showSortButton = '';

        let showInput = (
            <label>Sort current page by name:<br></br>
                <input className='search-input' type='text' id='search' ref={this.myInput} onChange={() => {
                    this.filterByName();
                }} />
            </label>);

        // showSortButton = (
        //     <button className='sort-button' onClick={() => {
        //         setTimeout(() => {
        //             this.alphabeticalSortNames();
        //             this.alphabeticalSortData();
        //         });
        //     }}>Alphabetical sort</button>
        // );

        const viewItems = (source) => {
            showPlanetsData = source.map((planetData, index) => {
                let numberOfItem = (this.props.TensNumber * 10 + index + 1) - 10;
                let ShowPlanetElement = (
                    <li key={planetData.name}>
                        <h2>{numberOfItem}</h2>
                        <h3>Name: <span>{planetData.name}</span></h3>
                        <p>Rotation peroid: <span>{planetData.rotation_peroid}</span></p>
                        <p>Climate: <span>{planetData.climate}</span></p>
                        <p>Gravity: <span>{planetData.gravity}</span></p>
                        <p>Created: <span>{planetData.created}</span></p>
                        <p>URL: <a href={planetData.url}>{planetData.url}</a></p>
                    </li>
                );
                return (ShowPlanetElement)
            });
        }

        // if (this.state.sortFlag) {
        //     viewItems(this.state.sortedData);
        // } else 

        if (this.props.SortFlag) {
            viewItems(this.props.SortedPlanetsData);
        } else if (this.state.filtered.length == 0 && this.myInput.current === null || this.myInput.current.value.length <= 1) {
            viewItems(this.props.PlanetsData);
        } else {
            viewItems(this.state.filtered);
        }

        return (
            <div className='show-planet-container'>
                {showInput}
                <ul className='planetsList'>
                    {showPlanetsData}
                </ul>
            </div>
        )
    }
}

export default ShowPlanetsData;