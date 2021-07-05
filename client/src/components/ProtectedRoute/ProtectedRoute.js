import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext/AuthContext'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuthContext().state
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}
