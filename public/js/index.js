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
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);//adds the item as the last child in the ordered list

});

socket.on('newLocationMessage', function(message) {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);//adds the item as the last child in the ordered list


  // let formattedTime = moment(message.createdAt).format('h:mm a');
  //
  // let li = jQuery('<li></li>');
  // let a = jQuery('<a target="_blank">My current location </a>');
  //
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault(); //prevents the page from reloading after the form is submitted

  let messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val()
  }, function () {
    messageTextbox.val(''); //clear the val after message is sent
  }); //acknowlegment callback
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function () {

  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...'); //disabled button

  navigator.geolocation.getCurrentPosition(function(position) {
    //success case
    locationButton.removeAttr('disabled').text('Send location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});//event listener
