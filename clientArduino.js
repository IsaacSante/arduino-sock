import WebSocket from 'ws'
const serverAddress = "wss://webscoket-unity.herokuapp.com/"
const arduinoData = "This my sample arduino data from Local"

const ws = new WebSocket(serverAddress);

ws.on('open', function() {
    setInterval(() => {
        ws.send('client 1' + arduinoData)
      }, 3000)
    //   ws.send('client 1:' + ' ' + arduinoData)
})

ws.on('message', function(msg) {
    console.log("Received msg from the server: " + msg);
});