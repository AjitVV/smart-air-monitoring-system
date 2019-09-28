import React, { Component } from 'react';
import './App.css';
import Header from './components/layout_components/header/header';
import Main from './components/container_components/visualization/main';
import { apiEndpoints } from './env';
const kafka = require('kafka-node');



class App extends Component {

  state = {
    data: [],
    randomData: "",
    isMonitoring: true,
    tempData: {
      columns: [
          ['My Numbers', 18, 21, 25, 23, 21, 23]
          // ['Your Numbers', 50, 20, 10, 40, 15, 25]
      ],
      type: 'area-spline',
      size: {
          height: 200
      }
    },
    pressureData: {
      columns: [
          ['My Numbers', 3, 5, 1, 13, 15, 1]
          // ['Your Numbers', 50, 20, 10, 40, 15, 25]
      ],
      type: 'spline',
      size: {
          height: 200
      }
    },
    alitudeData: {
      columns: [
          ['My_Numbers', 10000, 15000, 20000]
          // ['Your Numbers', 50, 20, 10, 40, 15, 25]
      ],
      type: 'bar',
      size: {
          height: 200

      },
      colors: {
        My_Numbers: '#ffbb33'
      }
    },
    airQualityData: {
      columns: [
          ['My_Numbers', 1, 5, 1, 12, 10, 1]
          // ['Your Numbers', 50, 20, 10, 40, 15, 25]
      ],
      type: 'spline',
      size: {
          height: 200
      },
      colors: {
        My_Numbers: '#7bc143'
      }
    }

  }

  getDataFromKafka = () => {
    let Consumer = kafka.Consumer;
    let client = new kafka.KafkaClient({kafkaHost: apiEndpoints.apiKafka, sasl: { mechanism: 'plain', username: '23irhi0r', password: 'fZO4c7igUGOuSgT4lt9oUSjJt86knV8x' }});

    let consumer = new Consumer(
      client,
      [
        { topic: '23irhi0r-sams_iot_internal_topic', partition: 1 }
      ],
      { autoCommit: false }
    );

    let Producer = kafka.Producer;
    let producer = new Producer(client);

    consumer.on('message', function(message){
     let data = JSON.parse(message.value);
     console.log(data);
      });
    }

    getRandomData = () => {
      
      this.myTimeout = setTimeout(() => {

        
        let temp = this.generateRandomData(18, 27);
        let altitude = this.generateRandomData(10000, 60000);
        let pressure = this.generateRandomData(3, 15);
        let airQuality = this.generateRandomData(1,10);
        let data = {
          temp,altitude,pressure,airQuality
        };
        let newTempData = [...this.state.tempData.columns[0], temp];
        let newPressureData = [...this.state.pressureData.columns[0], pressure];
        let newAltitudeData = [...this.state.alitudeData.columns[0], altitude];
        let newAirQualityData = [...this.state.airQualityData.columns[0], airQuality];
        // console.log(' new data is ', newTempData);
        this.setState({
          randomData:data,
          tempData: {
            ...this.state.tempData,
            columns: [newTempData]

          },
          pressureData: {
            ...this.state.pressureData,
            columns: [newPressureData]

          },
          alitudeData: {
            ...this.state.alitudeData,
            columns: [newAltitudeData]

          },
          airQualityData: {
            ...this.state.airQualityData,
            columns: [newAirQualityData]

          }
        }, () => {
          console.log(this.state);
          this.getRandomData();
        })

      }, 1000);

      }
    
    generateRandomData = (min,max) => {
      return Math.round(Math.random() * (max - min) + min); 

    }

    handleClearTimeout = () => {
      this.setState({
        isMonitoring: false
      })
      clearTimeout(this.myTimeout);
    }

    componentWillUnmount(){
      this.handleClearTimeout();
    }

    handleMonitoringStart = () => {
      this.setState({
        isMonitoring: true
      })
      this.getRandomData();
    }

    
  

  componentDidMount = () => {

    // this.getDataFromKafka();

    this.getRandomData();

  }
  render() {
    return (
      <div className="App">
        <Header />
        <Main
          tempData={this.state.tempData}
          pressureData={this.state.pressureData}
          airQualityData={this.state.airQualityData}
          alitudeData={this.state.alitudeData}
        />
        
        {
        <button disabled={this.state.isMonitoring} onClick={this.handleMonitoringStart} className={this.state.isMonitoring ? "btn btn-success" : "btn btn-primary"}> Start Monitoring </button>
          

        }
        
          &nbsp;
        

        <button onClick={this.handleClearTimeout} class="btn btn-primary"> Stop Monitoring </button>
      </div>
    )
  }

}

export default App;
