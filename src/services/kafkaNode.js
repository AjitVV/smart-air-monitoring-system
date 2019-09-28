const kafka = require('kafka-node');

import {apiEndpoints} from '../env';
let Consumer = kafka.Consumer;
let client = new kafka.Client(apiEndpoints.apiKafka);

let consumer = new Consumer(
    client,
    [
        {topic: 'samsData',partition: 0}
    ],
    {autoCommit: false}
);

consumer.on('message', function(message){
 let data = JSON.parse(message.value);
 console.log(data);
});