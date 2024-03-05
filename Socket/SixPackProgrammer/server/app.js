import express from 'express';
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors";

const port = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server , {
    cors : {
        origin : "http://localhost:5173",
    },
    methods : ["GET" , "POST"],
    credentials : true,
});
app.use(cors({
    cors : {
        origin : "http://localhost:5173",
    },
    methods : ["GET" , "POST"],
    credentials : true,
}));

io.on("connection", (socket)=>{
    console.log("user connected with socket id: " + socket.id);
    socket.broadcast.emit("event", "welcome " + socket.id); 
    socket.on("disconnect", ()=>{
        console.log("user disconnected  with socket id: " + socket.id);
    })
    socket.on("message", (message)=>{
        socket.broadcast.emit("receive-message", message)
    })
})


app.get('/', (req, res) => {
    res.send("Welcome");
})

server.listen(port , ()=>{
    console.log(`serve on port ${port}`);
});