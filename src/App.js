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
        console.log('this is working');
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
        console.log(' new data is ', newTempData);
        this.setState({
          randomData:data,
          tempData: {
            ...this.state.tempData,
            columns: [newTempData]

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
