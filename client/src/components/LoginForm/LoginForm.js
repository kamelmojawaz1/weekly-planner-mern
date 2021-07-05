import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import GoogleIcon from '@material-ui/icons/Google'
import './LoginForm.scss'
import Navbar from '../Navbar/Navbar'
import CloseIcon from '@material-ui/icons/Close'
import { useAppContext } from '../../contexts/AppContext/AppContext'
import Button from '@material-ui/core/Button'

const LoginForm = () => {
  const { loginFormVisible } = useAuthContext().state
  const { logInWithGoogle, hideLoginForm } = useAuthContext().actions
  const { darkMode } = useAppContext().state
  const history = useHistory()
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const handleGoogleClicked = async () => {
    try {
      await logInWithGoogle()
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const darkModeClass = darkMode ? 'dark' : 'light'
  const onClass = loginFormVisible ? 'on' : 'off'

  return (
    <div className={`modal ${darkModeClass} ${onClass}`} id="modal">
      <div className="modal-header">
        <h2>Sign In</h2>
        <button className="close-button" onClick={hideLoginForm}>
          <CloseIcon />
        </button>
      </div>

      <div className="content">
        <Button
          variant="contained"
          color="secondary"
          onClick={logInWithGoogle}
          startIcon={<GoogleIcon />}
        >
          Sign In with Google
        </Button>
      </div>
    </div>
  )
}

export default LoginForm
