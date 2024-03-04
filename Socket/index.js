const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// socket io's
io.on('connection', (socket) => {

    console.log('a user connected' , socket.id);

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('some event', msg); // This will emit the event to all connected sockets
    });

    

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});




server.listen(8000, () => {
    console.log("server listening on port " + 8000);
})



io.on("connection", (socket) => {
    socket.on("login" , (id) => {
        io.emit(id , "online user")
    })
})