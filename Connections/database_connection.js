const mongoose = require('mongoose')
const connectionString = process.env.CONNECTIONSTRING;
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Connection Established");
}).catch((err)=>{
    console.log(`error :${err}`);
})
