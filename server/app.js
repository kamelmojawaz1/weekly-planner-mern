require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoUrl = process.env.MONOG_URL
const connectToDb = require('./database/connect')
const groupsRouter = require('./routers/groups')
const tasksRouter = require('./routers/tasks')
const habitsRouter = require('./routers/habits')
const usersRouter = require('./routers/users')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/v1/groups/', groupsRouter)
app.use('/api/v1/tasks/', tasksRouter)
app.use('/api/v1/habits/', habitsRouter)
app.use('/api/v1/users/', usersRouter)

const start = () => {
  try {
    connectToDb(mongoUrl)
    app.listen(port, () => console.log(`app is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
