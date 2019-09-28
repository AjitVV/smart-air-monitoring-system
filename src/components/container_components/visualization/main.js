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
                        <MonitorTemperature />
                    </div>
                    <div className="col-md-6">
                        <MonitorPressure />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <MonitorAltitude />
                    </div>
                    <div className="col-md-6">
                        <MonitorAirQuality />
                    </div>
                </div>
            </div>
        )
    }
}