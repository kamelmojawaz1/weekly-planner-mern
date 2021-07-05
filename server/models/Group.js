const mongoose = require('mongoose')
const { Schema } = mongoose

const groupSchema = new Schema({
    name :{
        type:String,
        required:true,
        maxLength:20
    },
    color:{
        type:String,
        default:'blue'
    },
    userID:{
        type:Number,
        require:true
    },
    count:{
        type:Number,
        default:0
    }
  });

const Group = mongoose.model('Group',groupSchema)

module.exports = Group