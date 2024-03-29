const {Server} = require('socket.io');

const io = new Server(8000,{
    cors: true
});

let emailToSocketidMap = new Map();
let socketidToEmailMap = new Map();

io.on('connection' , (socket)=>{
    console.log("socket connented" , socket.id);
    socket.on('room:join' , (data)=>{
        const {email,room} = data;
        emailToSocketidMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined" , {email , id : socket.id});
        socket.join(room);
        io.to(socket.id).emit('room:join' , data);
    })
})