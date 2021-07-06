import { useContext, createContext, useReducer, useEffect } from 'react'
import { appReducer, dispatchMiddleware } from './appReducer'
import moment from 'moment'
import { appActions, INITIAL_TASKS } from '../../constants'
import { useAuthContext } from '../AuthContext/AuthContext'
import { useCookies } from 'react-cookie'

const AppContext = createContext({})

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const { currentUser } = useAuthContext().state
  const { showLoginForm } = useAuthContext().actions
  const userId = currentUser ? currentUser.uid : 0
  const [cookies, setCookie] = useCookies(['darkMode'])

  const initialState = {
    firstDay: moment().startOf('isoWeek'),
    lastDay: moment().startOf('isoWeek').add(7, 'd'),
    tasks: INITIAL_TASKS,
    habits: [],
    loading: true,
    darkMode: cookies.darkMode === 'true',
    userId: userId,
  }

  useEffect(() => {
    if (userId !== 0)
      dispatchMiddleware(dispatch)({
        type: appActions.GET_USER_DATA,
        payload: userId,
      })
    else
      dispatch({
        type: appActions.GET_INITIAL_DATA,
        payload: 0,
      })
  }, [userId])

  const [state, dispatch] = useReducer(appReducer, initialState)

  const goToNextWeek = firstDay =>
    dispatch({ type: appActions.GO_TO_NEXT_WEEK, payload: firstDay })

  const goToPreviousWeek = firstDay =>
    dispatch({ type: appActions.GO_TO_PREVIOUS_WEEK, payload: firstDay })

  const createTask = task => {
    return currentUser
      ? dispatchMiddleware(dispatch)({
          type: appActions.CREATE_TASK,
          payload: task,
        })
      : showLoginForm()
  }

  const deleteTask = taskId => {
    return currentUser
      ? dispatchMiddleware(dispatch)({
          type: appActions.DELETE_TASK,
          payload: taskId,
        })
      : showLoginForm()
  }

  const updateTask = taskId => {
    return currentUser
      ? dispatchMiddleware(dispatch)({
          type: appActions.UPDATE_TASK,
          payload: taskId,
        })
      : showLoginForm()
  }

  const createHabit = task => {
    return currentUser
      ? dispatchMiddleware(dispatch)({
          type: appActions.CREATE_HABIT,
          payload: task,
        })
      : showLoginForm()
  }

  const deleteHabit = taskId => {
    return currentUser
      ? dispatchMiddleware(dispatch)({
          type: appActions.DELETE_HABIT,
          payload: taskId,
        })
      : showLoginForm()
  }

  const updateHabit = taskId => {
    return currentUser
      ? dispatchMiddleware(dispatch)({
          type: appActions.UPDATE_HABIT,
          payload: taskId,
        })
      : showLoginForm()
  }

  const changeDarkMode = () => {
    setCookie('darkMode', !state.darkMode)
    dispatch({ type: appActions.CHANGE_DARK_MODE })
  }

  const value = {
    state: { ...state },
    actions: {
      goToNextWeek,
      goToPreviousWeek,
      createTask,
      deleteTask,
      updateTask,
      createHabit,
      deleteHabit,
      updateHabit,
      changeDarkMode,
    },
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
