import React from 'react'

import Detail from './pages/Detail'
import Login from './pages/Login'
import Register from './pages/Register'

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/detail/1" component={Detail} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App