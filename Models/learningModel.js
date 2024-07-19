const mongoose = require('mongoose');
const learningModel = new mongoose.Schema({
    key:{
        type:String,
        require:true
    },
    value:{
        type:String,
        require:true
    }
})
const botData = mongoose.model('chatdatas',learningModel)
module.exports=botData;