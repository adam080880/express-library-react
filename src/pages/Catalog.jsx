import React from 'react'

import Axios from 'axios'
import { appUrl } from '../configs/app'
import {
  Link,
} from 'react-router-dom'

import {
  Breadcrumb, BreadcrumbItem
} from 'reactstrap'

import qs from 'querystring'

class Catalog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      data: [], 
      pageInfo: {},
    }
  }

  fetchData = async (params) => {
    this.setState({isLoading: true})

    const param = qs.stringify(params)
    const url = appUrl(`books?${param}&limit=4`)

    const results = Axios.get(url)
    results.then((res) => {
      this.setState({ data: res.data.data, pageInfo: res.data.pageInfo })
    })
    .catch((rej) => {
      this.setState({ data: [] })
    })
    .finally(() => {
      this.setState({isLoading: false})
    })
    
    if (params) {
      this.props.history.push(`/dashboard/catalog?${param}`)
    }
  }

  async componentDidMount() {
    const param = qs.parse(this.props.location.search.slice(1))
    await this.fetchData(param)
  }

  condition = (props) => {
    if (this.state.isLoading || props.state.data.length > 0) return props.dataRender
    else if (props.state.data.length === 0 && !props.state.isLoading) return <h1>Data is not available</h1>
  }
  
  sortBy = (param) => {
    const params = {...qs.parse(this.props.location.search.slice(1)), ...{page: 1}, ...{ sort: param } }
    this.props.history.push('/dashboard/catalog?'+qs.stringify(params))

    window.location.reload(false)
  }

  bookRender = (book, index) => (
    <div className="col-6 col-xs-6 col-sm-6 col-md-3 col-lg-3 px-1 p-0 px-lg-2 mb-4" key={index}>
      <div className="card h-100 card-hoverable border-0 shadow-sm">
        <Link to={`/dashboard/catalog/detail/${book.id}`}>
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

  render() {
    const params = qs.parse(this.props.location.search.slice(1))
    params.page = params.page || 1
    return (
      <>
        <div className="container-fluid p-0 mb-5" style={{overflowX: 'hidden'}}>
          <Breadcrumb>
            <BreadcrumbItem>
              <span>Dashboard</span>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/dashboard/catalog" onClick={e => {e.preventDefault(); this.props.history.push('/dashboard/catalog'); window.location.reload(false)}}>Catalog</Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="d-flex flex-row align-items-center justify-content-between px-4 pb-0 mt-3">
            <h3>List Book</h3>
            <div className="filter d-flex align-items-center">
            <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sort By
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link className="dropdown-item" to="#" onClick={e => {e.preventDefault(); this.sortBy('desc')}}>Desc</Link>
                  <Link className="dropdown-item" to="#" onClick={e => {e.preventDefault(); this.sortBy('asc')}}>Asc</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 text-center">
              {this.state.isLoading && (
                <div className="spinner-border text-primary mx-auto my-5">
                  <div className="sr-only">Loading...</div>
                </div>
              )}
          </div>
          {!this.state.isLoading && (<div id="listBookWrapper" className="px-lg-3 px-1 mt-2">
            <div className="row no-gutters">
              <this.condition state={this.state} dataRender={this.state.data.map(this.bookRender)}></this.condition>
            </div>
          </div>)}
          <div className="d-flex flex-row align-items-center justify-content-between w-100 px-4">
            <div className="btn-wrapper">
            <button className="d-inline-flex btn btn-outline-secondary" disabled={params.page > 1 ? false : true} onClick={()=>this.fetchData({...params, page: parseInt(params.page) - 1})}>Prev</button>
            </div>                
            <div className="wrapper">
              {!this.state.isLoading && [...Array(this.state.pageInfo.totalPage)].map((o, i) => (
                <button onClick={()=>this.fetchData({...params, page: params.page? i+1 : i+1})} className='mx-1 btn btn-outline-secondary' key={i.toString()}>{i+1}</button>
              ))}
            </div>
            <div className="btn-wrapper">
              <button className="d-inline-flex btn btn-outline-secondary" disabled={params.page >= this.state.pageInfo.totalPage ? true : false} onClick={()=>this.fetchData({...params, page: parseInt(params.page) + 1})}>Next</button>
            </div> 
          </div>
        </div>
      </>
    )
  }
}

export default Catalog
