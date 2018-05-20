const path = require('path');
const http = require('http'); //built in node module
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app); // http server instead of express server
const io = socketIO(server);

//Middleware
app.use(express.static(publicPath));

//Do something when a client connects to the server
io.on('connection', (socket) => {
  console.log('New user connected');

  //sends to only the owner of the socket
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  //with broadcasting it'll send the event to everyone EXCEPT the owner of the socket
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  //custom event listener
  socket.on('createMessage', (message, callback) => {
    console.log('Create message: ', message);

    io.emit('newMessage', generateMessage(message.from, message.text)); //sends to all users
    callback(); //we can call it with an argument
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

});

server.listen(port, () => {
  console.log(`Server is up on port ${3000}`);
});
