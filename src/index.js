const app = require('./app');
/*async function main() {
    await app.listen(app.get('port'));
    console.log('Server on port ', app.get('port'));
}*/
const server = app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
const SocketIo = require('socket.io');
const io = SocketIo(server);

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

const mySerial = new SerialPort('/dev/ttyACM0', {
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


io.on('connect', function(socket) {
    socket.on("cli", function(mns) {
        mySerial.write(mns);
        console.log('Mensaje Escrito: ', mns);
    });
    console.log('Un Cliente Conectado');
});