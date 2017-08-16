var socket = io();

function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}
            
socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if(err){
            alert(err);
            window.location.href = '/';
        }
        else{
            console.log('No error');
        }
    });
    
    
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

socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
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
    scrollToBottom();
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
    scrollToBottom();
});

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




