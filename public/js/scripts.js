const socket = io()
const MAX_ROWS = 100
let data = {
    temperature1: [],
    temperature2:[],
    hydrogen: []
}
// let dataTemp1 = [];
// let dataTemp2 = [];
// let dataHydrogen = [];
let rowCount = 0
let rowStart = 0

let charts = {}

// let chartTemp1 
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
// let chartTemp2 
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
// let chartHydrogen 
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
    }
 /*
    if(content.sensorData.temperature1) {
        let template = "<tr id='" + (++rowCount + rowStart) + "'><td>" + content.time + "</td>" +
            "<td>Temperature 1 </td>  " +
            "<td>" + content.sensorData.temperature1 + " ºC</td></tr>"
         
        dataTemp1.push({
            y: content.time,
            a: content.sensorData.temperature1
        });
        if (dataTemp1.length > MAX_ROWS) {
            dataTemp1.shift()
        }
        $('.table-body').prepend(template);
        chartTemp1.setData(dataTemp1);
    }

    if (content.sensorData.temperature2) {
        let template = 
            "<tr id='" + (++rowCount + rowStart) + "'><td>" + content.time + "</td>" +
            "<td>Temperature 2 </td>" + 
            "<td>" + content.sensorData.temperature2 + " ºC</td> </tr> "
        dataTemp2.push({
            y: content.time,
            a: content.sensorData.temperature2
        });
        if (dataTemp2.length > MAX_ROWS) {
            dataTemp2.shift()
        }
        $('.table-body').prepend(template);
        chartTemp2.setData(dataTemp2);
    }

    if (content.sensorData.hydrogen) {
        let template = 
            "<tr id='" + (++rowCount + rowStart) + "'><td>" + content.time + "</td>" +
            "<td>Hydrogen </td>" + 
            "<td>" + content.sensorData.hydrogen + "</td></tr>" +

        dataHydrogen.push({
            y: content.time,
            a: content.sensorData.hydrogen
        });
        if (dataHydrogen.length > MAX_ROWS) {
            dataHydrogen.shift()
        }
        $('.table-body').prepend(template);
        chartHydrogen.setData(dataHydrogen);
    }

    while (rowCount > MAX_ROWS){
        rowStart++
        $('#'+rowStart).remove()
        rowCount--
    }
   */
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

    let template = "<tr id='" + (++rowCount + rowStart) + "'><td>" + content.time + "</td>" +
        "<td>" + sensor +"</td>  " +
        "<td>" + content.sensorData.value + "</td></tr>"
   // $('.table-body').prepend(template);

}