import React, {Component} from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

export default class MonitorTemperature extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: {
                columns: [
                    ['My Numbers', 30, 200, 100, 400, 150, 250]
                    // ['Your Numbers', 50, 20, 10, 40, 15, 25]
                ],
                type: 'line',
                size: {
                    height: 200
                }
            }
            
        }
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <C3Chart data={this.state.data} />
        )
    }

}