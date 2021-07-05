const Task = require('../models/Task')
const Habit = require('../models/Habit')

//api/users/1
const getUserData = async (req, res) => {
  try {
    const { userId } = req.params
    console.log(userId)
    const tasks = await Task.find({ userId: userId })
    const habits = await Habit.find({ userId: userId })
    res.status(200).json({
      success: true,
      data: {
        tasks: tasks,
        habits: habits,
        userId: userId,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    })
  }
}

module.exports = {
  getUserData,
}
