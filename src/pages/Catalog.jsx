import React from 'react'

import Axios from 'axios'
import { appUrl } from '../configs/app'
import {
  Link,
} from 'react-router-dom'

import {
  Breadcrumb, BreadcrumbItem
} from 'reactstrap'

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
        <Link to={`dashboard/detail/${book.id}`}>
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
        <div className="container-fluid p-0 mb-5">
          <Breadcrumb>
            <BreadcrumbItem>
              <span>Dashboard</span>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/dashboard/catalog">Catalog</Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <div id="listBookWrapper" className="pl-3 pr-2 mt-3">
            <div className="row no-gutters">
              <this.condition state={this.state} dataRender={this.state.data.map(this.bookRender)}></this.condition>
            </div>
            <div className="text-center mt-3" id="wrapperButton">
              <div className="btn btn-outline-primary px-4 rounded" onClick={this.nextPage}>More</div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Catalog
