//arrow functions don't work well in the client side jsin
let socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

//custom event
socket.on('newMessage', function(message) {
  console.log('Got new message: ', message);

  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li); //adds the item as the last child in the ordered list
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault(); //prevents the page from reloading after the form is submitted

  socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
  }, function () {

  });
});
