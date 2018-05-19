const path = require('path');
const http = require('http'); //built in node module
const express = require('express');
const socketIO = require('socket.io');

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

  socket.on('disconnect', (socket) => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${3000}`);
});
