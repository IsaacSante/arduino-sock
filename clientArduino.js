import WebSocket from 'ws'
import SerialPort from 'serialport'
process.setMaxListeners(0);
const serverAddress = 'wss://webscoket-unity.herokuapp.com/'
var portName = "COM8"; // Change to your port name
var myPort = new SerialPort(portName, 9600);

let Readline = SerialPort.parsers.Readline; // make instance of Readline parser
let parser = new Readline(); // make a new parser to read ASCII lines
myPort.pipe(parser); // pipe the serial stream to the parser

const ws = new WebSocket(serverAddress, {
    headers: {
        "user-agent": "Chrome"
    }
});


myPort.on('open', showPortOpen); // called when the serial port opens
myPort.on('close', showPortClose); // called when the serial port closes
myPort.on('error', showError); // called when there's an error with the serial port
parser.on('data', readSerialData); // called when there's new data incoming


function readSerialData(data) {
    data = data.trim();
    console.log(data)
    broadcast(data);
}

function showPortOpen() {
    console.log('port open. Data rate: ' + myPort.baudRate);
}

function showPortClose() {
    console.log('port closed.');
}

function showError(error) {
    console.log('Serial port error: ' + error);
}

function broadcast(data) {

    ws.send(JSON.stringify(data));

}
// import WebSocket from 'ws'
// const serverAddress = "wss://webscoket-unity.herokuapp.com/"

// var up = true;
// var value = 60;
// var increment = 1;
// var ceiling = 100;
// var c1, c2, c3, c4; 

// function PerformCalc() {
//     if (up == true && value <= ceiling) {
//       value += increment

//       if (value == ceiling) {
//         up = false;
//       }
//     } else {
//         up = false
//         value -= increment;

//         if (value == 60) {
//           up = true;
//         }
//     }

//       c1 = 'Client One' + value
//       c2 = 'Client Two' + (value + 10)
//       c3 = 'DistanceOne' + (value/2)
//       c4 = 'DistanceTwo' + (value/4)

// }
// setInterval(PerformCalc, 1000);

// const ws = new WebSocket(serverAddress);

// ws.on('open', function() {
//     setInterval(() => {
//         ws.send(c1)
//         ws.send(c2)
//         ws.send(c3)
//         ws.send(c4)
//       }, 1000)
// })

// ws.on('message', function(msg) {
//     console.log("Received msg from the server: " + msg);
// });