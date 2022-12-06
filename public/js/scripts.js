const socket = io()
const MAX_ROWS = 100
let data = {
    temperature1: [],
    temperature2:[],
    hydrogen: []
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
    labels: ['Temperature 1'],
    //yLabelFormat: function (y) { return y.toString() + ' ºC'; },
    parseTime: false,
    smooth: true,
    // pointFillColors: ['#ffffff'],
    // pointStrokeColors: ['gray'],
    lineColors: ['red']
});

charts.temperature2 = Morris.Line({
    element: 'temperature2',
    data: data['temperature2'],
    xkey: 'y',
    ykeys: ['a'],
    postUnits: 'ºC',
    labels: ['Temperature 2'],
    //yLabelFormat: function (y) { return y.toString() + ' ºC'; },
    parseTime: false,
    smooth: true,
    // pointFillColors: ['#ffffff'],
    // pointStrokeColors: ['gray'],
    lineColors: ['blue']
});

charts.hydrogen= Morris.Line({
    element: 'hydrogen',
    data: data['hydrogen'],
    xkey: 'y',
    ykeys: ['a'],
    //postUnits: 'ºC',
    labels: ['Hydrogen'],
    //yLabelFormat: function (y) { return y.toString() + ' ºC'; },
    parseTime: false,
    smooth: true,
    // pointFillColors: ['#ffffff'],
    // pointStrokeColors: ['gray'],
    lineColors: ['green']
});

charts.temp_hydrogen = Morris.Line({
    element: 'temp_hydrogen',
    data: data['hydrogen'],
    xkey: 'y',
    ykeys: ['a'],
    //postUnits: 'ºC',
    labels: ['Hydrogen'],
    //yLabelFormat: function (y) { return y.toString() + ' ºC'; },
    parseTime: false,
    smooth: true,
    // pointFillColors: ['#ffffff'],
    // pointStrokeColors: ['gray'],
    lineColors: ['orange']
});
socket.on('sensor-data', (content) => {
    console.log(content)
    if (content.sensorData.sensor_type == "temperature1") {
        setDataPoint(content, "temperature1")
    }
    if (content.sensorData.sensor_type == "temperature2") {
        setDataPoint(content, "temperature2")
    }
    if (content.sensorData.sensor_type == "hydrogen_Value") {
        setDataPoint(content, "hydrogen")
        // setDataPoint(content, "temp_hydrogen")
        charts["temp_hydrogen"].setData(data["hydrogen"]);
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