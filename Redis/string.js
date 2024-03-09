const client = require('./client');

const init = async (req,res) =>{
    await client.set("user:1" , "saquib shahid");
    const result = await client.get("user:1");
    console.log(result);
}

init();