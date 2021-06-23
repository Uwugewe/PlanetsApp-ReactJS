import React from 'react';
import './ShowPlanets.css';

function ShowPlanetsData(props) {

    let showPlanetsData = props.PlanetsData.map(planetData => {
        let ShowPlanetElement = (
            <ul key={planetData.name + '_ul'}>
                <li key={planetData.name}>
                    <p>Name: <span>{planetData.name}</span></p>
                    <p>Rotation peroid: <span>{planetData.rotation_peroid}</span></p>
                    <p>Climate: <span>{planetData.climate}</span></p>
                    <p>Gravity: <span>{planetData.gravity}</span></p>
                    <p>Created: <span>{planetData.created}</span></p>
                    <p>URL: <a href={planetData.url}>{planetData.url}</a></p>
                </li>
            </ul>
        );
        return (ShowPlanetElement)
    });

    return (
        <div>
            {showPlanetsData}
        </div>
    )
}

export default ShowPlanetsData;