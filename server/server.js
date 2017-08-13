const path = require('path');

const express = require('express');

const socketIO = require('socket.io');

const http = require('http');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);

var io = socketIO(server);

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
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welocome to the chat app',
        createdAt: new Date().getTime()
    });
    
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'new user joined',
        createdAt: new Date().getTime()
    });
    
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
//        socket.broadcast.emit('newMessage',{
//            from: message.from,
//            text: message.text,
//            createdAt: new Date().getTime()
//        });
    });
    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});



