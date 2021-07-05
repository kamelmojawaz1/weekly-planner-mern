import React, { useContext, useState, useEffect } from 'react'
import { auth, fbLogInWithGoogle, fbAddAuthListner, fbLogOut } from './firebase'

const AuthContext = React.createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [loginFormVisible, setLoginFormVisible] = useState(false)

  //wrapping firebase functionality,so we dont get locked in provider
  const logOut = () => fbLogOut()

  const logInWithGoogle = () => {
    return fbLogInWithGoogle()
  }
  const showLoginForm = () => setLoginFormVisible(true)

  const hideLoginForm = () => setLoginFormVisible(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      user ? setLoginFormVisible(false) : setLoginFormVisible(true)
    })

    return unsubscribe
  }, [])

  const value = {
    state: {
      currentUser,
      loading,
      loginFormVisible,
    },
    actions: {
      logInWithGoogle,
      logOut,
      showLoginForm,
      hideLoginForm,
    },
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
