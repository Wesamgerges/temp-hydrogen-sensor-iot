const socket = io()
const MAX_ROWS = 100
let data = {
    temperature1: [],
    temperature2:[],
    hydrogen: [],
    temp_hydrogen:  []
}

let rowCount = 0
let rowStart = 0

let charts = {}
charts.temperature1 = Morris.Line({
    element: 'temperature1',
    data: data['temperature1'],
    xkey: 'y',
    ykeys: ['a'],
    postUnits: 'ºC',
    labels: ['Temperature1'],
    parseTime: false,
    smooth: true,
    lineColors: ['red']
});

charts.temperature2 = Morris.Line({
    element: 'temperature2',
    data: data['temperature2'],
    xkey: 'y',
    ykeys: ['a'],
    postUnits: 'ºC',
    labels: ['Temperature2'],
    parseTime: false,
    smooth: true,
    lineColors: ['blue']
});

charts.hydrogen= Morris.Line({
    element: 'hydrogen',
    data: data['hydrogen'],
    xkey: 'y',
    ykeys: ['a'],
    labels: ['Hydrogen'],
    parseTime: false,
    smooth: true,
    lineColors: ['green']
});

charts.temp_hydrogen = Morris.Line({
    element: 'temp_hydrogen',
    data: data['temp_hydrogen'],
    xkey: 'hydrogen',
    ykeys: ['temperature2'],
    postUnits: 'ºC',
    labels: ['Temperature'],
    parseTime: false,
    smooth: true,
    lineColors: ['orange']
});
socket.on('sensor-data', (content) => {
    console.log(content)
    if (content.sensorData.sensor_type == "temperature1") {
        setDataPoint(content, "temperature1")
    }
    if (content.sensorData.sensor_type == "temperature2") {
        setDataPoint(content, "temperature2")
        setExtraDataPoints(content, "temperature2")
    }
    if (content.sensorData.sensor_type == "hydrogen_Value") {
        setDataPoint(content, "hydrogen")
        setExtraDataPoints(content, "hydrogen")
        
    }
});

function setDataPoint(content, sensor) {
    data[sensor].push({
        y: content.time,
        a: content.sensorData.value
    });
    if (data[sensor].length > MAX_ROWS) {
        data[sensor].shift()
    }
    charts[sensor].setData(data[sensor]);
}

function setExtraDataPoints(content, sensor){
    if (data["temp_hydrogen"].length > 0 && !data["temp_hydrogen"].at(-1)[sensor]) {
        data["temp_hydrogen"].at(-1)[sensor] = content.sensorData.value
    } else {
        t = {}
        t[sensor] = content.sensorData.value
        data["temp_hydrogen"].push(t)
    }
    charts["temp_hydrogen"].setData(data["temp_hydrogen"]);
}