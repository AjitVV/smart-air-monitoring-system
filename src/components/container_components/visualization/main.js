import React, { Component } from 'react';
import MonitorTemperature from '../../container_components/visualization/temperature_graph';
import MonitorPressure from '../../container_components/visualization/pressure_graphs';
import MonitorAltitude from '../../container_components/visualization/altitude_graph';
import MonitorAirQuality from '../../container_components/visualization/air_quality_graphs';

export default class Main extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <label>Temperature (in Celsius)</label>
                        <MonitorTemperature data={this.props.tempData} />
                    </div>
                    <div className="col-md-6">
                        <label>Pressure (in psi)</label>
                        <MonitorPressure data={this.props.pressureData} />
                    </div>
                </div>
                <br></br>
                <hr></hr>
                <div className="row">
                    <div className="col-md-6">
                        <label>Altitude (in ft)</label>
                        <MonitorAltitude data={this.props.alitudeData} />
                    </div>
                    <div className="col-md-6">
                        <label>Air Quality (in AQI)</label>
                        <MonitorAirQuality data={this.props.airQualityData} />
                    </div>
                </div>
            </div>
        )
    }
}