const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('message', (data) => {
        io.emit('message', data);  // Broadcast to all clients
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(5000, () => console.log('Server running on port 5000'));

