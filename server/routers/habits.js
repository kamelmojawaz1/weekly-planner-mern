const express = require('express')
const habitsRouter = express.Router()
const {createHabit,updateHabit,deleteHabit} = require('../controllers/habitsController')

habitsRouter.post('/:userId',createHabit)    
habitsRouter.patch('/:habitId',updateHabit)
habitsRouter.delete('/:habitId',deleteHabit)

module.exports = habitsRouter