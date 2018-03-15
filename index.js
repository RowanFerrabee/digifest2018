
var SerialPort = require('serialport');
var fs = require('fs');
var http = require('http');
var express = require("express");

var port = new SerialPort('/dev/tty.usbmodem1421', {
  baudRate: 9600
});

var httpPort = '8080';
var httpHost = '127.0.0.1';

// Most recent line printed to serial port
var currentLine = "";
var line = "N/A";

port.on('readable', function () {

  // Building line, piece by piece
  var data = port.read().toString();
  currentLine += data;

  if (data.includes("\n")) {
    // Line building completed
    // console.log('Last Line:', line);
    line = currentLine;
    currentLine = "";
  }
});

var app = express();
app.use(express.static(__dirname + "/public"));
console.log("Running App on Port "+httpPort);

app.get("/read", function(request, response) {
    response.send(line);
});

app.get("/write", function(request, response){
  var data = 1;
  port.write([data], 'binary');
  port.drain();
  console.log("Wrote: "+data);
  response.send("Good");
});

app.listen(httpPort, httpHost);

// http.createServer(function (req, res) {
//   fs.readFile('index.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });
// }).listen(8080); //the server object listens on port 8080
