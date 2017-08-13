const path = require('path');

const express = require('express');

const socketIO = require('socket.io');

const http = require('http');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

const {generateMessage, generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
    
//    socket.emit('newEmail', {
//        from: 'mike@example.com',
//        text: 'Whats up?',
//        createAt: 123
//    });
    
//    socket.emit('newMessage', {
//        from: 'Lynch',
//        text: 'Damn good cafe',
//        createdAt: 123
//    });
    
//    socket.on('createEmail', (newEmail) => {
//        console.log('createEmail', newEmail);
//    });
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is from the server');
//        socket.broadcast.emit('newMessage',{
//            from: message.from,
//            text: message.text,
//            createdAt: new Date().getTime()
//        });
    });
    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude)); 
    });
    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});



