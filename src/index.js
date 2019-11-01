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

io.on('connect', function(socket) {
    socket.on("cli", function(mns) {
        mySerial.write(mns);
        console.log('Mensaje Escrito: ', mns);
    });
    console.log('Un Cliente Conectado');
});