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
  constructor(props) {
    super(props)
    this.state = {
      seconds: 3
    }
  }

  componentDidMount() {
    setInterval(() => this.setState({seconds: this.state.seconds - 1}), 1000)
  }

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
            <Route>
              <p>404 Page redirect to catalog in { this.state.seconds } seconds { this.state.seconds === 0 && <Redirect to="/dashboard/catalog" /> }</p>
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App