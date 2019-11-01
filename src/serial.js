const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

const mySerial = new SerialPort('/dev/ttyACM1', {
    baudRate: 9600
});


mySerial.pipe(parser);

mySerial.on('open', function() {
    console.log('Puerto Abierto.');
});

mySerial.on('data', function(data) {
    console.log(data.toString());
    io.emit('arduino:data', {
        value: data.toString()
    });
});


mySerial.on('error', function(data) {
    console.log("error serial");
    console.log(data.message);
});