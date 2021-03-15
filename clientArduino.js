import WebSocket from 'ws'
const serverAddress = 'wss://sample-websocket.glitch.me/'
const arduinoData = "Yas Queen"

const ws = new WebSocket(serverAddress, {
    headers: {
        "user-agent": "Chrome"
    }
});

ws.on('open', function() {
    ws.send("Hello from my local computer Bitch");
    ws.send(arduinoData)
});

ws.on('message', function(msg) {
    console.log("Received msg from the server: " + msg);
});