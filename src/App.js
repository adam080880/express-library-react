import React from 'react'

import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

class App extends React.Component {
  PrivateRoute = (props) => {
    return !localStorage.getItem('token') ? (
      <Redirect to="/auth/login" />
    ) : (
      <Route {...props}>{props.children}</Route>
    )
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App