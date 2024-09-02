const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json()); // For parsing application/json

// Use authentication routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/realtime-messaging', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

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

