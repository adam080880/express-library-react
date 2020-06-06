import React from 'react'

import {
  Row, Col
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

import Catalog from './Catalog'

class Dashboard extends React.Component {
  logout = (e) => {
    localStorage.removeItem('token')
    localStorage.removeItem('session_user')
    this.props.history.push('/auth/login')
  }

  render() {
    return (
      <div className="container-fluid px-0">
        <Row className="dashboard mx-0">
          <div className="sidebar">

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
              <ul className="navbar-nav">
                {localStorage.getItem('token') && (
                  <li className="nav-item">
                    <Link className="nav-link btn btn-danger btn-sm text-white font-weight-bold ml-3" onClick={this.logout}>Logout</Link>
                  </li>
                )}
              </ul>
            </div>

            <Catalog />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard