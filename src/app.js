const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const SocketIo = require('socket.io');
const io = SocketIo.listen(server);

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

const mySerial = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600
});
//configuracion
app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//routes

app.use(require('./routes/index'));

//static
app.use(express.static(path.join(__dirname, '/public')));


// 404 handler

app.use((req, res, next) => {
    res.status(404).send('404 not found');
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
    console.log(data.message);
});


io.on('connect', function(socket) {
    socket.on("cli", function(mns) {
        mySerial.write(mns);
        console.log('Mensaje Escrito: ', mns);
    });
    console.log('Un Cliente Conectado');
});


module.exports = app;