import React from 'react'

import Profile from '../assets/img/profile.png'
import Logo from '../assets/img/book (1).svg'
import Axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import { appUrl } from '../configs/app'

import {
  Link,
} from 'react-router-dom'

class Catalog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      data: [], 
      page: 1
    }
  }

  async componentDidMount() {
    const results = await Axios.get(appUrl(`books?limit=4&page=${this.state.page}`))
    const { data } = results.data
    this.setState({ data, isLoading: false })
  }

  logout = (e) => {
    e.preventDefault()

    this.props.history.push('/login')
  }

  condition = (props) => {
    if (props.state.isLoading) return <h1>Loading..</h1>
    else if (props.state.data.length > 0) return props.dataRender
    else if (props.state.data.length === 0 && !props.state.isLoading) return <h1>Data is not available</h1>
  }

  bookRender = (book, index) => (
    <div className="col-6 col-xs-12 col-md-4 col-lg-3 px-2 mb-4" key={index}>
      <div className="card h-100 card-hoverable">
        <Link to={`detail/${book.id}`}>
          <div className="card-img-top bg-secondary w-100" style={{height: "180px", backgroundImage: `url(${book.image})`, backgroundSize: "cover"}}>
          </div>
        </Link>
        <div className="card-body">
          <h5 className="card-title font-weight-bold">
            {book.title}
          </h5>
          <div className="d-flex mt-0 mb-2 flex-row align-items-center justify-content-between">
            <h6 className="card-subtitle mb-0 text-muted">
              {book.genre}
            </h6>                      
            <div className={`badge badge-${ book.status === 'available' ? 'success' : 'danger' }`}>
              {book.status}
            </div>
          </div>
          <Link to={`detail/${book.id}`} className="card-link">
            More
          </Link>
        </div>
      </div>
    </div>
  )

  nextPage = async (e) => {
    this.setState({
      isLoading: true
    })

    const results = await Axios.get(appUrl(`books?limit=4&page=${this.state.page + 1}`))

    const tempBooks = [...this.state.data, ...results.data.data]

    this.setState({
      data: tempBooks,
      isLoading: false,
      page: this.state.page + 1
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
          <div className="col mb-3 bg-light">
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
                  <this.condition state={this.state} dataRender={this.state.data.map(this.bookRender)}></this.condition>
                </div>
                <div className="text-center mt-3" id="wrapperButton">
                  <div className="btn btn-outline-primary px-4 rounded" onClick={this.nextPage}>More</div>
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
