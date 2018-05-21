//arrow functions don't work well in the client side jsin
let socket = io();

function scrollToBottom () {
  // Selectors
  let messages = jQuery('#messages');
  let newMessage = messages.children('li:last-child'); //get the last list item in the list

  //Heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight(); //lastMessageHeight before adding a new message

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    // console.log('Should scroll down');
    messages.scrollTop(scrollHeight);
  }
}

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
  scrollToBottom();
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
  scrollToBottom();
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
