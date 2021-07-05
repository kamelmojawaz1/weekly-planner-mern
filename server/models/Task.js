const mongoose = require('mongoose')
const {Schema} = mongoose

const taskSchema = new Schema({
    name :{
        type:String,
        required:true,
        maxLength:200,
        minLength:1,        
    },
    color :{
        type:String,
        default:'silver',
    },
    highPriority:{
        type:Boolean,
        default:false,
    },
    date:{
        type:Date,
        require:true,
    },
    completed:{
        type:Boolean,
        default:false,
    },
    isToDo:{
        type:Boolean,
        default:false,
    },
    userId:{
        type:String,
        required:true,
    }
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task
