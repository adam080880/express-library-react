import React from 'react'

import Profile from '../assets/img/profile.png'
import Logo from '../assets/img/book (1).svg'

import 'bootstrap/dist/css/bootstrap.min.css'

import {
  Link,
} from 'react-router-dom'

class Catalog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: 'loading'
    }
  }

  componentDidMount() {
    // const stateHistory = this.props.location.state
  }

  logout = (e) => {
    e.preventDefault()

    this.props.history.push('/login', {
      isLogin: false
    })
  }

  render() {
    return (
      <>
        <div className="row no-gutters h-100">
          <div className="col-2 shadow-sm flex-column border-right d-sm-none d-md-none d-xs-none d-lg-flex">
            <div id="control" className="navbar mb-3" style={{height: "80px"}}>
              <ul className="navbar-nav ml-auto">
                <li style={{fontSize: "25px"}} className="nav-item">
                  <span className="font-weight-bold">&equiv;</span>
                </li>
              </ul>
            </div>
            <div id="profile-section" className="mb-4 align-self-center text-center">
              <img src={Profile} alt="" className="rounded-circle" width={135} />
              <h5 className="font-weight-bold mt-3">Muhamad Adam</h5>
              <button onClick={this.logout} className="btn btn-danger font-weight-bold btn-sm">Log Out</button>
            </div>
            <div id="menu-bar" className="nav flex-column ml-3">
              <div className="nav-item">
                <Link to="/catalog" className="nav-link text-secondary font-weight-bold">Catalog</Link>
              </div>
              <div className="nav-item">
                <Link to="/histories" className="nav-link text-secondary font-weight-bold">Histories</Link>
              </div>
              <div className="nav-item">
                <Link to="/add-book" className="nav-link text-secondary font-weight-bold">Add Book</Link>
              </div>
            </div>
          </div>
          <div className="col bg-light">
            <div className="mb-3 navbar navbar-expand-md d-flex justify-content-between bg-white border-bottom" style={{height: "80px"}}>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle text-secondary font-weight-bold" to="#" id="allCategories" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    All Categories
                  </Link>
                  <div className="dropdown-menu rounded-0" aria-labelledby="allCategories">
                    <Link className="dropdown-item" to="#">Horror</Link>
                    <Link className="dropdown-item" to="#">Comedy</Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle text-secondary font-weight-bold" to="#" id="allTime" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    All Time
                  </Link>
                  <div className="dropdown-menu rounded-0" aria-labelledby="allTime">
                    <Link className="dropdown-item" to="#">Today</Link>
                    <Link className="dropdown-item" to="#">Yesterday</Link>
                    <Link className="dropdown-item" to="#">Week</Link>
                    <Link className="dropdown-item" to="#">Year</Link>
                  </div>
                </li>
              </ul>
              <div className="flex-grow-1 mx-5 px-5 d-flex flex-row align-items-center">
                <i className="fas fa-search position-absolute fa-sm text-muted" style={{marginLeft: "18px"}}></i>
                <input type="search" name="" id="" className="rounded-pill form-control pl-5 px-3" placeholder="Search here" />
              </div>
              <Link to="#" className="navbar-brand d-flex flex-row justify-content-center">
                <img src={Logo} alt="logo" width={30} />
                <span className="ml-1 font-weight-bold text-dark">Library</span>
              </Link>
            </div>

            <div className="container-fluid p-0">
              <div id="listBookWrapper" className="pl-3 pr-2">
                <h5 className="font-weight-bold mb-3">
                  List Book
                </h5>
                <div className="row no-gutters">
                  <div className="col-6 col-xs-12 col-md-4 col-lg-3 pr-2 mb-2">
                    <div className="card h-100 card-hoverable">
                      <Link to="/detail/1">
                        <div className="card-img-top bg-secondary w-100" style={{height: "180px", backgroundImage: `url('${require("../assets/img/covernya (1).png")}')`, backgroundSize: "cover"}}>
                        </div>
                      </Link>
                      <div className="card-body">
                          <h5 className="card-title font-weight-bold">
                            Dilan 1990
                          </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Romance
                        </h6>                      
                        <Link to="/detail/1" className="card-link">
                          More
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xs-12 col-md-4 col-lg-3 pr-2 mb-2">
                    <div className="card h-100 card-hoverable">
                      <Link to="/detail/1">
                        <div className="card-img-top bg-secondary w-100" style={{height: "180px", backgroundImage: `url('${require("../assets/img/koalakumal.jpg")}')`, backgroundSize: "cover"}}>
                        </div>
                      </Link>
                      <div className="card-body">
                          <h5 className="card-title font-weight-bold">
                            Koala Kumal
                          </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Comedy
                        </h6>                      
                        <Link to="/detail/1" className="card-link">
                          More
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xs-12 col-md-4 col-lg-3 pr-2 mb-2">
                    <div className="card h-100 card-hoverable">
                      <Link to="/detail/1">
                        <div className="card-img-top bg-secondary w-100" style={{height: "180px", backgroundImage: `url('${require("../assets/img/tere_liye.jpg")}')`, backgroundSize: "cover"}}>
                        </div>
                      </Link>
                      <div className="card-body">
                          <h5 className="card-title font-weight-bold">
                            Hujan
                          </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Filosofi
                        </h6>                      
                        <Link to="/detail/1" className="card-link">
                          More
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-xs-12 col-md-4 col-lg-3 pr-2 mb-2">
                    <div className="card h-100 card-hoverable">
                      <Link to="/detail/1">
                        <div className="card-img-top bg-secondary w-100" style={{height: "180px", backgroundImage: `url('${require("../assets/img/tewasnya_gagak_hitam.jpg")}')`, backgroundSize: "cover"}}>
                        </div>
                      </Link>
                      <div className="card-body">
                          <h5 className="card-title font-weight-bold">
                            Tewasnya Gagak Hitam
                          </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Mistery
                        </h6>                      
                        <Link to="/detail/1" className="card-link">
                          More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Catalog
