import React from 'react'

import Detail from './pages/Detail'
import Login from './pages/Login'
import Register from './pages/Register'
import Catalog from './pages/Catalog'
import ListData from './pages/ListData'

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
            <Route exact path="/catalog" component={Catalog} />
            <Route exact path="/list-data" component={ListData} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App