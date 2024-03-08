const mongoose =require("mongoose");
const conn = require("./mongo.db");
const platformSchema=new mongoose.Schema({
    newsPlatform:{
        type:String,
        required:true,
        index:true
    },
    category:{
        type:Array,
        required:true
    }
})
const platformModel=conn.model("platforms",platformSchema)
module.exports=platformModel;