const Habit = require('../models/Habit')

const createHabit = async (req,res) => {
    try {
        const {userId} = req.params
        let habit = {...req.body,userId}
        habit = await Habit.create(habit)    
        return res.status(201).json({
            'success':true,
            'data':habit
        })
    } catch (error) {
        return res.status(500).json({
                'success':false,
                'message':error
        })
    }
}

const deleteHabit = async (req,res) => {
    try {
        const {habitId} = req.params
        const habit = await Habit.findOneAndDelete({_id:habitId})
        return res.status(200).json({
            'success':true,
            data:habit
        })                
    } catch (error) {
        return res.status(500).json({
            'success':false,
            'message':error
        })
    }
}

const updateHabit = async (req,res) => {
    try {
        const {habitId} = req.params
        let habit = req.body
        habit = await Habit.findOneAndUpdate({_id:habitId},habit,{new:true,runValidators:true})
        return res.status(200).json({
            'success':true,
            data:habit
        })
    } catch (error) {
        return res.status(500).json({
            'success':false,
            'message':error
        })
    }
}



module.exports = {
    createHabit,
    deleteHabit,
    updateHabit,
}