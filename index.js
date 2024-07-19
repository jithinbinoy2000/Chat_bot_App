require('dotenv').config();
require('./Connections/database_connection')
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000
const botData = require('./Models/learningModel');


app.listen(port,()=>{
console.log(`server start listening at port ${port}`);
})
 app.post("/admin/adddatas",async(request,response)=>{
    let {key,value}=request.body;
    if(key && value){
     const exsistingKey =await botData.findOne({key})
     if(exsistingKey){
        response.status(400).send(message=`${key} is alreay present`)
     }
     else{
        const newbotData = new botData({
            key,
            value
        })
        await newbotData.save();
        response.status(200).send(message=`${key}:${value} is added Successfully`)
     }
    }else{
        response.status(400).send(message="error : Key or value is Missing")
    }
 })