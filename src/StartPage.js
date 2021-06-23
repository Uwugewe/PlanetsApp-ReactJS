import React, {Component} from "react";
import GetPlanetsData from "./GetPlanetsData";

class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    render() {
        
        return(
            <div>
                <GetPlanetsData />
            </div>
        )
    }
}

export default StartPage