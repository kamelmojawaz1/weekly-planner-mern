import { appActions, INITIAL_TASKS } from '../../constants'
import moment from 'moment'
import axios from 'axios'

const baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api/v1'
    : process.env.REACT_APP_API_BASE_URL

export const dispatchMiddleware = dispatch => {
  return async action => {
    const { type, payload } = action
    switch (type) {
      case appActions.GET_USER_DATA: {
        const data = await getUserData(payload)
        if (data) {
          action.payload = data
          dispatch(action)
        }
        break
      }

      case appActions.GET_TASKS: {
        const newTasks = await getTasks()
        if (newTasks) {
          action.payload = newTasks
          dispatch(action)
        }
        break
      }

      case appActions.CREATE_TASK: {
        const newTask = await createTask(payload)
        if (newTask) {
          action.payload = newTask
          dispatch(action)
        }
        break
      }

      case appActions.DELETE_TASK: {
        if (await deleteTask(payload)) dispatch(action)
        break
      }

      case appActions.UPDATE_TASK: {
        const newTask = await updateTask(payload)
        if (newTask) {
          action.payload = newTask
          return dispatch(action)
        }
        return false
      }

      case appActions.CREATE_HABIT: {
        const res = await createHabit(payload)
        if (!res.success) return res
        action.payload = res.habit
        return dispatch(action)
      }

      case appActions.DELETE_HABIT: {
        const res = await deleteHabit(payload)
        if (!res.success) return res
        return dispatch(action)
      }

      case appActions.UPDATE_HABIT: {
        const res = await updateHabit(payload)
        if (!res.success) return res
        action.payload = res.habit
        return dispatch(action)
      }

      default:
        return dispatch(action)
    }
  }
}

export const appReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case appActions.SHOW_LOGIN_SCREEN: {
      return { ...state, loginScreen: true }
    }

    case appActions.GET_INITIAL_DATA: {
      return { ...state, tasks: INITIAL_TASKS, habits: [], loading: false }
    }

    case appActions.GET_USER_DATA: {
      const { tasks, habits, userId } = payload
      return {
        ...state,
        tasks: tasks,
        habits: habits,
        userId: userId,
        loading: false,
        loginScreen: false,
      }
    }

    case appActions.GET_TASKS: {
      const newTasks = payload
      return { ...state, tasks: newTasks, loading: false }
    }

    case appActions.CREATE_TASK: {
      const task = payload
      const newTasks = state.tasks
      console.log(payload)
      newTasks.push(task)
      return { ...state, tasks: newTasks }
    }

    case appActions.DELETE_TASK: {
      const taskId = payload
      const newTasks = state.tasks.filter(task => task._id !== taskId)
      return { ...state, tasks: newTasks }
    }

    case appActions.UPDATE_TASK: {
      const updatedTask = payload
      const newTasks = state.tasks.map(task => {
        return task._id === updatedTask._id ? updatedTask : task
      })
      return { ...state, tasks: newTasks }
    }

    case appActions.CREATE_HABIT: {
      const habit = payload
      const newHabits = state.habits
      newHabits.push(habit)
      return { ...state, habits: newHabits }
    }

    case appActions.DELETE_HABIT: {
      const habitId = payload
      const newHabits = state.habits.filter(habit => habit._id !== habitId)
      return { ...state, habits: newHabits }
    }

    case appActions.UPDATE_HABIT: {
      const updatedHabit = payload
      const newHabits = state.habits.map(habit => {
        return habit._id === updatedHabit._id ? updatedHabit : habit
      })
      return { ...state, habits: newHabits }
    }

    case appActions.GO_TO_NEXT_WEEK: {
      const firstDayOfCurrentWeek = payload

      const firstDayOfNextWeek = moment(firstDayOfCurrentWeek.toString())
      firstDayOfNextWeek.add(7, 'd')

      const lastDayOfNextWeek = moment(firstDayOfCurrentWeek.toString())
      lastDayOfNextWeek.add(13, 'd')

      return {
        ...state,
        firstDay: firstDayOfNextWeek,
        lastDay: lastDayOfNextWeek,
      }
    }

    case appActions.GO_TO_PREVIOUS_WEEK: {
      const firstDayOfCurrentWeek = payload

      const firstDayOfLastWeek = moment(firstDayOfCurrentWeek.toString())
      firstDayOfLastWeek.add(-7, 'd')

      const lastDayOfLastWeek = moment(firstDayOfCurrentWeek.toString())
      lastDayOfLastWeek.add(-1, 'd')

      return {
        ...state,
        firstDay: firstDayOfLastWeek,
        lastDay: lastDayOfLastWeek,
      }
    }

    case appActions.CHANGE_DARK_MODE: {
      return { ...state, darkMode: !state.darkMode }
    }

    case appActions.CHANGE_LOADING: {
      return { ...state, loading: payload }
    }

    default:
      return state
  }
}

const getUserData = async userId => {
  try {
    const res = await axios.get(`${baseUrl}/users/${userId}`)
    if (res.status === 200) {
      return res.data.data
    }
  } catch (error) {
    console.log(error)
  }
  return false
}

const getTasks = async () => {
  try {
    const res = await axios.get(`${baseUrl}/tasks/1`)
    if (res.status === 200) return res.data.data
  } catch (error) {
    console.log(error)
  }
  return false
}

const createTask = async task => {
  try {
    const res = await axios.post(`${baseUrl}/tasks/${task.userId}`, task)
    if (res.status === 201) return res.data.data
  } catch (error) {
    console.log(error)
  }
  return false
}

const deleteTask = async taskId => {
  try {
    const response = await axios.delete(`${baseUrl}/tasks/${taskId}`)
    return response.status === 200
  } catch (error) {
    console.log(error)
  }
  return false
}

const updateTask = async task => {
  try {
    const res = await axios.patch(`${baseUrl}/tasks/${task._id}`, task)
    if (res.status === 200) return res.data.data
  } catch (error) {
    console.log(error)
  }
}

const createHabit = async habit => {
  try {
    const res = await axios.post(`${baseUrl}/habits/${habit.userId}`, habit)
    return {
      success: res.status === 201,
      habit: res.status === 201 ? res.data.data : null,
    }
  } catch (error) {
    return {
      success: false,
      message: error.toString(),
    }
  }
}

const deleteHabit = async habitId => {
  try {
    const res = await axios.delete(`${baseUrl}/habits/${habitId}`)
    return {
      success: res.status === 200,
    }
  } catch (error) {
    return {
      success: false,
      message: error.toString(),
    }
  }
}

const updateHabit = async habit => {
  try {
    const res = await axios.patch(`${baseUrl}/habits/${habit._id}`, habit)
    return {
      success: res.status === 200,
      habit: res.status === 200 ? res.data.data : null,
    }
  } catch (error) {
    return {
      success: false,
      message: error.toString(),
    }
  }
}
