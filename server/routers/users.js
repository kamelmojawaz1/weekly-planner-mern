const express = require('express')
const usersRouter = express.Router()
const {getUserData} = require('../controllers/usersController')

usersRouter.get('/:userId',getUserData)

module.exports = usersRouter
