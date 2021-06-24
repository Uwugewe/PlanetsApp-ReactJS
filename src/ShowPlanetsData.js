import React, { Component } from 'react';
import './ShowPlanets.css';

function ShowPlanetsData(props) {
    let showPlanetsData = props.PlanetsData.map((planetData, index) => {
    let numberOfItem = (props.TensNumber*10 + index+1)-10;
        let ShowPlanetElement = (
            <li key={planetData.name}>
                {/* <h2>{props.TensNumber-1}+{index+1}</h2> */}
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

    return (
        <ul className='planetsList'>
            {showPlanetsData}
        </ul>
    )
}

// class ShowPlanetsData extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//     }

//     render() {
//         let count = 0;
//         let showPlanetsData = props.PlanetsData.map((planetData, index) => {
//             console.log(props.PlanetsData.length)
//             count += props.PlanetsData.length;
//             let ShowPlanetElement = (
//                 <li key={planetData.name}>
//                     <h2>{props.TensNumber - 1}{index + 1}</h2>
//                     <h3>Name: <span>{planetData.name}</span></h3>
//                     <p>Rotation peroid: <span>{planetData.rotation_peroid}</span></p>
//                     <p>Climate: <span>{planetData.climate}</span></p>
//                     <p>Gravity: <span>{planetData.gravity}</span></p>
//                     <p>Created: <span>{planetData.created}</span></p>
//                     <p>URL: <a href={planetData.url}>{planetData.url}</a></p>
//                 </li>
//             );
//             return (ShowPlanetElement)
//         });
//         console.log(count);

//         return (
//             <ul className='planetsList'>
//                 {showPlanetsData}
//             </ul>
//         )
//     }
// }

export default ShowPlanetsData;