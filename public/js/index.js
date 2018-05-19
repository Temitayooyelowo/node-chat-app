//arrow functions don't work well in the client side jsin
let socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createEmail', {
    to: 'jen@example.com',
    text: 'Hey. This is Andrew.'
  });

  socket.emit('createMessage', {
    from: 'Tayo',
    text: 'Sending message'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

//custom event
socket.on('newMessage', function(message) {
  console.log('Got new message: ', message);
});
