import React from 'react'

import {
  Row, Col
} from 'reactstrap'

import {
  Link,
  Switch,
  Route
} from 'react-router-dom'

import AuthModel from '../models/auth'

import Catalog from './Catalog'
import Detail from './Detail'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    const session_user = JSON.parse(localStorage.getItem('session_user'))

    this.state = {
      session_user: session_user
    }
  }

  logout = (e) => {
    AuthModel.logout()
    this.props.history.push('/auth/login')
  }

  render() {
    return (
      <Switch>
        <>
          <div className="container-fluid px-0">
            <Row className="dashboard mx-0">
              <div className="sidebar text-white sticky-top" style={{maxHeight: "100vh"}}>
                <div className="d-flex flex-column justify-content-between" style={{height: "100%"}}>
                  <div className="p-3 flex-grow-1 d-flex flex-column justify-content-center mb-5 pb-5">
                    <div>
                      Hello, <br/><b>{ this.state.session_user ? this.state.session_user.email : 'Guest' }</b>
                    </div>
                    <div className="mt-3 ml-0 mb-5">
                      <div className="nav pl-0 flex-column sidebar-menu">
                        <div className="nav-item">
                          <Link to="/dashboard/catalog" className="nav-link ml-0 pl-0">Catalog</Link>
                        </div>
                        {this.state.session_user && (<div className="nav-item">
                          <Link to="/dashboard/history" className="nav-link ml-0 pl-0">History</Link>
                        </div>)}
                        {this.state.session_user && (this.state.session_user.role.toLowerCase() === 'super admin' || this.state.session_user.role.toLowerCase() === 'admin') && (<div className="nav-item">
                              <Link to="" className="nav-link ml-0 pl-0">Add Book</Link>
                            </div>)}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-sidebar-secondary small">
                    &copy; Copyright <b>EXP.L!bs</b>
                  </div>
                </div>
              </div>
              <Col className="px-0">
                <div className="navbar navbar-expand-lg navbar-light bg-white shadow-sm d-flex flex-row justify-content-between align-items-center px-4" style={{height: "70px"}}>
                  <Link className="navbar-brand font-weight-bold" to="/">
                    EXP.L!bs
                  </Link>
                  <div id="searchWrapper" className="w-50 d-flex flex-row align-items-center">
                    <span className="fas fa-search fa-sm position-absolute text-muted" style={{marginLeft: "18px"}}></span>
                    <input type="search" className="form-control rounded-pill px-3 pl-5" placeholder="Search books" />
                  </div>
                  <ul className="navbar-nav d-md-none d-sm-none d-xs-none d-lg-block d-none">
                    {localStorage.getItem('token') && (
                      <li className="nav-item">
                        <Link to="#" className="nav-link btn btn-danger text-white font-weight-bold ml-3" onClick={this.logout}>Logout</Link>
                      </li>
                    )}
                    {!localStorage.getItem('token') && (
                      <li className="nav-item">
                      <Link to="/auth/login" className="btn btn-outline-primary font-weight-bold ml-3">Login</Link>
                    </li>
                    )}
                  </ul>
                </div>

                  <Route exact path="/dashboard/catalog" component={Catalog} />
                  <Route exact path="/dashboard/catalog/detail/:id" component={Detail} />
                  <Route exact path="/dashboard/history" component={Detail} />
              </Col>
            </Row>
          </div>
        </>
      </Switch>
    )
  }
}

export default Dashboard