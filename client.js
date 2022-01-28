const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const client = net.connect('3000', 'localhost', () => {
    console.log('connected to server');
    client.write('Hello World!');
});

client.on('data', data => {
    console.log("" + data);
});

client.on('close', () => {
    console.log('client-> connection is closed');
    client.destroy();
});

rl.on("line", (line) => {
    client.write(line);
});