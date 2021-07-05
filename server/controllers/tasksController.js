const Task = require('../models/Task')

const getUserTasks = async (req,res) => {
    try {
        const {userId} = req.params
        const tasks = await Task.find({userId:userId})
        return res.status(200).json({
            'success':true,
            data:tasks
        })
    } catch (error) {
        return res.status(500).json({
            'success':false,
            'message':error
        })        
    }
}

const createTask = async (req,res) => {
    try {
        const {userId} = req.params
        let task = {...req.body,userId}
        task = await Task.create(task)
        return res.status(201).json({
            'success':true,
            'data':task            
        })
    } catch (error) {
        return res.status(500).json({
            'success':false,
            'message':error
        })
    }    
}

const deleteTask = async (req,res) => {
    try {
        const {taskId} = req.params
        const task = await Task.findOneAndDelete({_id:taskId})
        return res.status(200).json({
            'success':true,
            'data':task            
        })
    } catch (error) {
        return res.status(500).json({
            'success':false,
            'message':error
        })
    }    
}

const updateTask = async (req,res) => {
    try {
        const {taskId} = req.params
        let task = req.body
        task = await Task.findOneAndUpdate({_id:taskId},task,{new:true,runValidators:true})
        return res.status(200).json({
            'success':true,
            'data':task            
        })
    } catch (error) {
        return res.status(500).json({
            'success':false,
            'message':error
        })
    }    
}

module.exports = {
    getUserTasks,
    createTask,
    deleteTask,
    updateTask,
}