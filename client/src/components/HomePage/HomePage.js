import React from 'react'
import './HomePage.css'
import Navbar from '../Navbar/Navbar'
import WeekCalendar from '../WeekCalendar/WeekCalendar'
import LoginForm from '../LoginForm/LoginForm'
import { useAppContext } from '../../contexts/AppContext/AppContext'
import { useAuthContext } from '../../contexts/AuthContext/AuthContext'

const HomePage = () => {
  const { darkMode } = useAppContext().state
  const { loginFormVisible } = useAuthContext().state
  const darkModeClass = darkMode ? 'dark' : 'light'
  const disabledClass = loginFormVisible ? 'disabled' : ''
  const onClass = loginFormVisible ? 'on' : 'off'
  // console.count('home page')
  return (
    <div className={`home-page ${darkModeClass}`}>
      <div className={`${disabledClass}`}>
        <Navbar />
        <WeekCalendar />
      </div>
      <LoginForm />
    </div>
  )
}

export default HomePage
