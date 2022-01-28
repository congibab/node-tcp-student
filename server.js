const net = require('net');
var clients = [];

const server = net.createServer(socket => {

    clients.push(socket);
    
    socket.on('data', data => {
        console.log(data + ' from ' + socket.remoteAddress + ':' + socket.remotePort);
        socket.write('server -> Repeating: ' + data);
        BroadCast(socket, data);
    });

    socket.on('error', () => {

    })

    socket.on('close', () => {
        clients.pop();
        console.log('client closed connection');
    });
}).listen(3000);

console.log('listening on port 3000');

function BroadCast(socket, data)
{
    clients.forEach(client => {
    
        if(socket == client) return;
        client.write(data);
    });
}