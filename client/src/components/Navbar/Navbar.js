import React from 'react'
import './Navbar.css'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useAppContext } from '../../contexts/AppContext/AppContext'
import { useAuthContext } from '../../contexts/AuthContext/AuthContext'
import Switch from '../Switch/Switch'
import LogoutIcon from '@material-ui/icons/Logout'
import LoginIcon from '@material-ui/icons/Login'
import GitHubIcon from '@material-ui/icons/GitHub'

const Navbar = () => {
  const { firstDay, lastDay, darkMode } = useAppContext().state
  const { goToNextWeek, goToPreviousWeek, changeDarkMode } =
    useAppContext().actions
  const darkModeClass = darkMode ? 'dark' : 'light'
  const { currentUser } = useAuthContext().state
  const { logOut, showLoginForm } = useAuthContext().actions

  const handleNextClicked = () => {
    goToNextWeek(firstDay)
  }

  const handlePreviousClicked = () => {
    goToPreviousWeek(firstDay)
  }

  return (
    <div className="navbar">
      <h1>Weekly Planner</h1>
      <div className="navbar-date">
        <button onClick={handlePreviousClicked}>
          <NavigateBeforeIcon />
        </button>
        <h4>
          {firstDay.format('MMM DD YYYY')} - {lastDay.format('MMM DD YYYY')}
        </h4>
        <button onClick={handleNextClicked}>
          <NavigateNextIcon />
        </button>
      </div>
      <div className={`navbar-options dropdown `}>
        <MoreVertIcon />
        <div className={`dropdown-content ${darkModeClass}`}>
          <div className="dropdown-option" onClick={changeDarkMode}>
            <h5>Dark Mode</h5>
            <div style={{ marginTop: '0.75rem' }}>
              <Switch isToggled={darkMode} disabled={true} />
            </div>
          </div>
          <a
            href="https://github.com/kamelmojawaz1/weekly-planner"
            target="_blank"
          >
            <div className="dropdown-option">
              <h5>Source</h5>
              <button>
                <GitHubIcon />
              </button>
            </div>
          </a>
          {currentUser ? (
            <div className="dropdown-option" onClick={logOut}>
              <h5>Sign Out</h5>
              <button>
                <LogoutIcon />
              </button>
            </div>
          ) : (
            <div>
              <div className="dropdown-option" onClick={showLoginForm}>
                <h5>Sign In</h5>
                <button>
                  <LoginIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
