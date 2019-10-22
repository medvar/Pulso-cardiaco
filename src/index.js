const app = require('./app');
async function main() {
    await app.listen(app.set('port'));
    console.log('Server on port ', app.set('port'));
}


main();