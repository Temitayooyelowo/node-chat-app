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

socket.on('newLocationMessage', function(message) {
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank"> My current location </a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault(); //prevents the page from reloading after the form is submitted

  socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=message]').val()
  }, function () {

  });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function () {

  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    //success case
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('Unable to fetch location');
  });
});//event listener
