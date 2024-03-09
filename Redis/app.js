const express = require('express');
const axios = require('axios');
const client = require('./client');

const app = express();


app.get('/', async (req, res) => {
    const cachedData = await client.get("users");
    if (cachedData){
        return res.json(JSON.parse(cachedData));
    }
    const {data} = await axios.get("https://jsonplaceholder.org/users");
    await client.set("users", JSON.stringify(data));
    return res.json(data);
});

app.listen(9000 , ()=>{
    console.log("server listening on port 9000");
})