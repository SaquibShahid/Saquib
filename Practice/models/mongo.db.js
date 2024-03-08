const mongoose = require('mongoose');
const conn = mongoose.createConnection("mongodb+srv://unibitsourav:7YG32Jt6PrQzbJmW@cluster0.vq5emeh.mongodb.net/news");
if(conn !== undefined){
    console.log("connection established");
}
module.exports = conn;
