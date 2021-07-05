import './App.css'
import HomePage from './components/HomePage/HomePage'
import LoginForm from './components/LoginForm/LoginForm'
import { AppProvider } from './contexts/AppContext/AppContext'
import { AuthProvider } from './contexts/AuthContext/AuthContext'
import { positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { CookiesProvider } from 'react-cookie'

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
}

const App = () => {
  console.count('App.js')
  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <Router>
          <CookiesProvider>
            <AuthProvider>
              <Switch>
                <AppProvider>
                  <HomePage />
                  <Route path="/login" component={LoginForm} />
                </AppProvider>
              </Switch>
            </AuthProvider>
          </CookiesProvider>
        </Router>
      </Provider>
    </div>
  )
}

export default App
