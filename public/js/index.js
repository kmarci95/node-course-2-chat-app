var socket = io();
            
socket.on('connect', function () {
    console.log('Connected to server');
    
//    socket.emit('createEmail', {
//        to: 'jen@eample.com',
//        text: 'Hey its me'
//    });
//    
//    socket.emit('createMessage', {
//        from: 'Cooper',
//        text: 'Cherry pie'
//    });
});
            
socket.on('disconnect', function () {
    console.log('Disconnected from server'); 
});

//socket.on('newEmail', function (email) {
//    console.log('new email', email);
//    document.getElementById('p_email').textContent = JSON.stringify(email,undefined,2);
//});

socket.on('newMessage', function(message) {
    console.log('new message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

//socket.emit('createMessage',{
//    from: 'frank',
//    text: 'HI'
//}, function(data) {
//    console.log(data);
//});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage',{
        from: 'user',
        text: jQuery('[name=message]').val()
    }, function() {
        
    });
});


