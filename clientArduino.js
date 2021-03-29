import WebSocket from 'ws'
const serverAddress = "wss://webscoket-unity.herokuapp.com/"

var up = true;
var value = 60;
var increment = 1;
var ceiling = 100;

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

}
setInterval(PerformCalc, 1000);


const ws = new WebSocket(serverAddress);

ws.on('open', function() {
    setInterval(() => {
        ws.send(value)
      }, 1000)
})

ws.on('message', function(msg) {
    console.log("Received msg from the server: " + msg);
});