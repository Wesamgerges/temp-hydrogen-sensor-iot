const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');
const SERVER_PORT = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

// app.use((req, res) => {
//     res.status(404).json({
//         message: 'Resource not found'
//     });
// });

io.on('connection', (socket) => {
    console.log('Connection has been established with browser.');
    socket.on('disconnect', () => {
        console.log('Browser client disconnected from the connection.');
    });
});

app.post('/sensor', (request, response) => {
    const { body } = request;
    console.log(body)
    // temp1 = body.temperature1
    // temp2 = body.temperature2
    // hydrogen = body.hydrogen
    sensor_type = body.sensor_type
    value = body.value
    datetime = body.datetime
    console.log(body );
    const data = {
        sensorData: { sensor_type: sensor_type, value: value, datetime: datetime},
        time: datetime //moment().format('HH:mm:ss')
    };
    io.emit('sensor-data', data);
    response.sendStatus(200);
});

http.listen(process.env.PORT || SERVER_PORT, () => {
    console.log(`Server started on the http://localhost:${SERVER_PORT}`);
});

