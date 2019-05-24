const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 4000;

io.on('connection', function(socket) {
    console.log('User connected');

    socket.on('message', function(message) {
        console.log('get message' + message);
        io.sockets.emit('message', message);
    });

    socket.on('typing', function(data) {
        console.log(data);
        socket.broadcast.emit('typing', data);
    });

    socket.on('unTyping', function(data) {
        console.log(data);
        socket.broadcast.emit('unTyping', data);
    });

    socket.on('createChannel', function(data) {
        console.log(data);
        if (data.names != null) {
            data.names.forEach((name)=> {
                console.log(name);
                socket.broadcast.emit(name, data.convId);
            });
        }
    });
});

server.listen(port, function() {
    console.log('listen to 4000');
})