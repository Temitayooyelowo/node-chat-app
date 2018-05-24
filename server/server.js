const path = require('path');
const http = require('http'); //built in node module
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app); // http server instead of express server
const io = socketIO(server);
const users = new Users();

//Middleware
app.use(express.static(publicPath));

//Do something when a client connects to the server
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required'); //argument in callback is error argument
    }

    socket.join(params.room); //join a room
    //socket.leave('Room name'); //leave a room

    // io.emit -> io.to('Room name').emit
    // socket.broadcast.emit -> socket.broadcast.to('Room name').emit
    // socket .emit
    users.removeUser(socket.id); //remove user from old room if they were already in a particular room
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //sends to only the owner of the socket
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    //with broadcasting it'll send the event to everyone EXCEPT the owner of the socket
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

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
    let user = users.removeUser(socket.id);

    if(user){
      //update user list
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      //print message
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
    console.log('User was disconnected');
  });

});

server.listen(port, () => {
  console.log(`Server is up on port ${3000}`);
});
