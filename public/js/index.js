var socket = io();
            
socket.on('connect', function () {
    console.log('Connected to server');
    
    socket.emit('createEmail', {
        to: 'jen@eample.com',
        text: 'Hey its me'
    });
    
    socket.emit('createMessage', {
        from: 'Cooper',
        text: 'Cherry pie'
    });
});
            
socket.on('disconnect', function () {
    console.log('Disconnected from server'); 
});

socket.on('newEmail', function (email) {
    console.log('new email', email);
    document.getElementById('p_email').textContent = JSON.stringify(email,undefined,2);
});

socket.on('newMessage', function(message) {
    console.log('new message', message);
    document.getElementById('p_message').textContent = JSON.stringify(message,undefined,2);
});

