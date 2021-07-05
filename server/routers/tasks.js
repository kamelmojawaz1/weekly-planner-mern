const express = require('express')
const tasksRouter = express.Router()
const {getUserTasks,createTask,deleteTask,updateTask} = require('../controllers/tasksController')

tasksRouter.get('/:userId',getUserTasks)
tasksRouter.post('/:userId',createTask)
tasksRouter.delete('/:taskId',deleteTask)
tasksRouter.patch('/:taskId',updateTask)

module.exports = tasksRouter