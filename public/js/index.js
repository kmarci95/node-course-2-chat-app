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
//    var formattedTime = moment(message.createdAt).format('k:mm');
//    console.log('new message', message);
//    var li = jQuery('<li></li>');
//    li.text(`${formattedTime} | ${message.from}: ${message.text}`);
//    jQuery('#messages').append(li);
    
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('k:mm');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
//    var formattedTime = moment(message.createdAt).format('k:mm');
//    var li = jQuery('<li></li>');
//    var a = jQuery('<a target="_blank">My current location</a>');
//    li.text(`${formattedTime} | ${message.from}: `);
//    a.attr('href',message.url);
//    li.append(a);
//    jQuery('#messages').append(li);
    
    var template = jQuery('#location-message-template').html();
    var formattedTime = moment(message.createdAt).format('k:mm');
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    
})

//socket.emit('createMessage',{
//    from: 'frank',
//    text: 'HI'
//}, function(data) {
//    console.log(data);
//});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',{
        from: 'user',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('geolocation not supported by your user');
    }
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
});




