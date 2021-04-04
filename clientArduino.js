import WebSocket from 'ws'
const serverAddress = "wss://webscoket-unity.herokuapp.com/"

var up = true;
var value = 60;
var increment = 1;
var ceiling = 100;
var c1, c2, c3, c4; 

function PerformCalc() {
    if (up == true && value <= ceiling) {
      value += increment
      
      if (value == ceiling) {
        up = false;
      }
    } else {
        up = false
        value -= increment;

        if (value == 60) {
          up = true;
        }
    }

      c1 = 'Client One' + value
      c2 = 'Client Two' + (value + 10)
      c3 = 'DistanceOne' + (value/2)
      c4 = 'DistanceTwo' + (value/4)

}
setInterval(PerformCalc, 1000);

const ws = new WebSocket(serverAddress);

ws.on('open', function() {
    setInterval(() => {
        ws.send(c1)
        ws.send(c2)
        ws.send(c3)
        ws.send(c4)
      }, 1000)
})

ws.on('message', function(msg) {
    console.log("Received msg from the server: " + msg);
});