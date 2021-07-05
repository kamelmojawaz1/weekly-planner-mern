const mongoose = require('mongoose')
const {Schema} = mongoose

const HabitSchema = new Schema ({
    userId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
        maxLength:200,
        minLength:1,
    },
    days:{
        type:Array,
        default:[false,false,false,false,false,false,false],        
    },
    color:{
        type:String,
        default:'silver',
    },
    date:{
        type:Date,
        required:true,
    }    
})

const Habit = mongoose.model('Habit',HabitSchema)

module.exports = Habit