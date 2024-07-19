require('dotenv').config();
require('./Connections/database_connection')
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000
const botData = require('./Models/learningModel');
const bulkData = require('./data')

app.listen(port,()=>{
console.log(`server start listening at port ${port}`);
})
//save datas
 app.post("/admin/adddatas",async(request,response)=>{
    let {key,value}=request.body;
    if(key && value){
     const exsistingKey =await botData.findOne({key})
     if(exsistingKey){
        console.log(exsistingKey);
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
 //retreive datas
 app.get("/getchat",async(request,response)=>{
let {message}= request.body;
 const regex = new RegExp(message,"i")
 const result = await botData.findOne({key:{$regex:regex}})
 console.log(result);
// let replayData = await botData.findOne({key:message})
if(result){
response.status(200).send(result.value);
}else{
    response.status(201).send(message="sorry i didn't get you !")
}
 })
 app.post("/addbulkdata",async(request,response)=>{
try{
    await botData.insertMany(bulkData)
    response.status(200).send(message="success")
}catch(err){
    response.status(500).send(err)
}
 })