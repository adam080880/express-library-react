import React from 'react'

import {
  Link
} from 'react-router-dom'

import {
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap'

import qs from 'querystring'

import TransactionModel from '../models/transaction'
import Swal from 'sweetalert2'

class Transaction extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      histories: [],
      pageInfo: {},
      searchAdmin: '',
      isLoading: true
    }

    if (!localStorage.getItem('session_user')) {
      this.props.history.push('/auth/login')
    }
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem('session_user')).role === 'Member') {
      this.fetchMember('page=1')
    } else {
      this.fetchAdmin('page=1')
    }
  }

  fetchAdmin = (param) => {
    this.setState({
      isLoading: true
    })

    TransactionModel.adminTransaction(param).then((res) => {
      this.setState({
        histories: res.data.data,
        pageInfo: res.data.pageInfo
      })
    })
    .catch((rej) => {
      this.setState({
        histories: [],
      })
    })
    .finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  fetchMember = (param) => {
    this.setState({
      isLoading: true
    })

    TransactionModel.memberTransaction(param).then((res) => {
      this.setState({
        histories: res.data.data,
        pageInfo: res.data.pageInfo
      })
    })
    .catch((rej) => {
      this.setState({
        histories: [],
      })
    })
    .finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  cancel = (id) => {
    const params = qs.parse(this.props.location.search.slice(1))
    const search = qs.stringify({...params, ...{page: 1}})

    this.setState({
      isLoading: true
    })

    TransactionModel.toCancel(id).then((res) => {
      Swal.fire(
        'Success',
        'Status transaction changed to cancel and has been deleted',
        'success'
      )
    }).catch((rej) => {
      Swal.fire(
        'Failed',
        rej.response.data.msg,
        'error'
      )
    }).finally(() => {
      this.fetchAdmin(search)
      this.setState({
        isLoading: false
      })
    })
  }

  borrow = (id) => {
    const params = qs.parse(this.props.location.search.slice(1))
    const search = qs.stringify({...params, ...{page: 1}})

    this.setState({
      isLoading: true
    })

    TransactionModel.toBorrow(id).then((res) => {
      Swal.fire(
        'Success',
        'Status transaction changed to borrowed',
        'success'
      )
    }).catch((rej) => {
      Swal.fire(
        'Failed',
        rej.response.data.msg,
        'error'
      )
    }).finally(() => {
      this.fetchAdmin(search)
      this.setState({
        isLoading: false
      })
    })
  }

  return = (id) => {
    const params = qs.parse(this.props.location.search.slice(1))
    const search = qs.stringify({...params, ...{page: 1}})

    this.setState({
      isLoading: true
    })

    TransactionModel.toReturn(id).then((res) => {
      Swal.fire(
        'Success',
        'Status transaction changed to returned',
        'success'
      )
    }).catch((rej) => {
      Swal.fire(
        'Failed',
        rej.response.data.msg,
        'error'
      )
    }).finally(() => {
      this.fetchAdmin(search)
      this.setState({
        isLoading: false
      })
    })
  }

  status = (status) => {
    const params = qs.parse(this.props.location.search.slice(1))
    const search = qs.stringify({...params, ...{page: 1}, ...{search: status}})

    this.props.history.push(`/dashboard/history?${search}`)
    if (JSON.parse(localStorage.getItem('session_user')).role === 'Member') {
      this.fetchMember(search)
    } else {
      this.fetchAdmin(search)
    }
  }

  adminTransaction = (val, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{val.book_title}</td>
      <td>{val.member}</td>
      <td>{val.promise_returned_at}</td>
      <td>
      <div className="dropdown">
        <button className={`btn ${val.status !== 'returned' ? 'btn-danger' : 'btn-success'} dropdown-toggle`} disabled={val.status !== 'returned' ? false : true} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {val.status}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {val.status === 'booked' && (
            <>
              <Link className="dropdown-item" onClick={e => this.borrow(val.id)} to="#">To Borrow</Link>
              <Link className="dropdown-item" onClick={e => this.cancel(val.id)} to="#">To Cancel</Link>
            </>
          )}
          {val.status === 'borrowed' && (
            <>
              <Link className="dropdown-item" onClick={e => this.return(val.id)} to="#">To Return</Link>
              <Link className="dropdown-item" onClick={e => this.cancel(val.id)} to="#">To Cancel</Link>
            </>
          )}
        </div>
      </div>
      </td>
    </tr>
  )

  memberTransaction = (val, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{val.book_title}</td>
      <td>{val.promise_returned_at}</td>
      <td><div className={`badge ${val.status === 'returned' ? 'badge-primary' : 'badge-danger'}`}>{val.status}</div></td>
    </tr>
  )

  searchAdmin = (e) => {
    e.preventDefault()

    const params = qs.parse(this.props.location.search.slice(1))
    const search = qs.stringify({...params, ...{page: 1}, ...{search:this.state.searchAdmin}})
    this.props.history.push(`/dashboard/history?${search}`)

    if (JSON.parse(localStorage.getItem('session_user')).role === 'Member') {
      this.fetchMember(search)
    } else {
      this.fetchAdmin(search)
    }
  }

  sortBy = (param) => {
    const params = {...qs.parse(this.props.location.search.slice(1)), ...{page: 1}, ...{ sort: param } }
    const search = qs.stringify({...params, ...{page: 1}, ...{search:this.state.searchAdmin}})
    this.props.history.push('/dashboard/history?'+search)

    if (JSON.parse(localStorage.getItem('session_user')).role === 'Member') {
      this.fetchMember(search)
    } else {
      this.fetchAdmin(search)
    }
  }

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
              <Link to="/dashboard/history">History Transaction</Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="d-flex flex-row align-items-center px-4 pb-0 mt-3 justify-content-between">
            <h3>History Transaction</h3>
            <div className="control d-flex align-items-center">
              <form action="" className="d-inline-flex" onSubmit={this.searchAdmin}>
                <input type="search" onChange={e => this.setState({searchAdmin: e.target.value})} className="form-control shadow-sm" placeholder="Search here"/>
                <div className="dropdown ml-2 mr-0">
                  <button className="btn btn-outline-secondary d-flex flex-row align-items-center dropdown-toggle" type="button" id="1dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Status
                  </button>
                  <div className="dropdown-menu" aria-labelledby="1dropdownMenuButton">
                    <Link className="dropdown-item" to="#" onClick={e => {e.preventDefault(); this.status('booked')}}>Booked</Link>
                    <Link className="dropdown-item" to="#" onClick={e => {e.preventDefault(); this.status('borrowed')}}>Borrowed</Link>
                    <Link className="dropdown-item" to="#" onClick={e => {e.preventDefault(); this.status('returned')}}>Returned</Link>
                  </div>
                </div>
                <div className="filter d-flex align-items-center ml-2">
                  <div className="dropdown">
                      <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButtonw" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort By
                      </button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButtonw">
                        <Link className="dropdown-item" to="#" onClick={e => {e.preventDefault(); this.sortBy('desc')}}>Desc</Link>
                        <Link className="dropdown-item" to="#" onClick={e => {e.preventDefault(); this.sortBy('asc')}}>Asc</Link>
                      </div>
                    </div>
                  </div>
              </form>
            </div>
          </div>
          <div className="px-lg-3 px-1 mt-2">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                {localStorage.getItem('session_user') && ((JSON.parse(localStorage.getItem('session_user')).role === 'Admin' || JSON.parse(localStorage.getItem('session_user')).role === 'Super Admin') && !this.state.isLoading) && (
                  <div className="table-responsive">
                    {this.state.histories.length > 0 && (
                      <>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Book Title</th>
                              <th>Member Email</th>
                              <th>Return Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.histories.map(this.adminTransaction)}
                          </tbody>
                        </table>
                        <div className="w-100 d-flex justify-content-between">
                          <button className="d-inline-flex btn btn-outline-secondary" disabled={params.page > 1 ? false : true} onClick={()=>{this.props.history.push(`/dashboard/history?${qs.stringify({...params, page: parseInt(params.page) - 1})}`);this.fetchMember(qs.stringify({...params, page: parseInt(params.page) - 1}))}}>Prev</button>      
                          <div className="pagination-">
                            {[...Array(this.state.pageInfo.totalPage)].map((a, index) => (
                              <button className="mx-1 btn btn-outline-secondary" key={index} onClick={(e) => {
                                const params = qs.parse(this.props.location.search.slice(1))
                                const search = qs.stringify({...params, ...{page: (index+1)}})
                                this.props.history.push(`/dashboard/history?${search}`)
                                this.fetchAdmin(search)
                              }}>{index+1}</button>
                            ))}
                          </div>
                          <button className="d-inline-flex btn btn-outline-secondary" disabled={params.page >= this.state.pageInfo.totalPage ? true : false} onClick={()=>{this.props.history.push(`/dashboard/history?${qs.stringify({...params, page: parseInt(params.page) + 1})}`);this.fetchAdmin(qs.stringify({...params, page: parseInt(params.page) + 1}))}}>Next</button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {localStorage.getItem('session_user') && (JSON.parse(localStorage.getItem('session_user')).role === 'Member') && !this.state.isLoading && (
                <div className="table-responsive">
                  {this.state.histories.length > 0 && (
                    <>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Book Title</th>
                            <th>Return Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.histories.map(this.memberTransaction)}
                        </tbody>
                      </table>
                      <div className="w-100 d-flex justify-content-between">
                        <button className="d-inline-flex btn btn-outline-secondary" disabled={params.page > 1 ? false : true} onClick={()=>{this.props.history.push(`/dashboard/history?${qs.stringify({...params, page: parseInt(params.page) - 1})}`);this.fetchMember(qs.stringify({...params, page: parseInt(params.page) - 1}))}}>Prev</button>      
                        <div className="pagination-">
                          {[...Array(this.state.pageInfo.totalPage)].map((a, index) => (
                            <button className="mx-1 btn btn-outline-secondary" key={index} onClick={(e) => {
                              const params = qs.parse(this.props.location.search.slice(1))
                              const search = qs.stringify({...params, ...{page: (index+1)}})
                              this.props.history.push(`/dashboard/history?${search}`)
                              this.fetchMember(search)
                            }}>{index+1}</button>
                          ))}
                        </div>
                        <button className="d-inline-flex btn btn-outline-secondary" disabled={params.page >= this.state.pageInfo.totalPage ? true : false} onClick={()=>{this.props.history.push(`/dashboard/history?${qs.stringify({...params, page: parseInt(params.page) + 1})}`);this.fetchMember(qs.stringify({...params, page: parseInt(params.page) + 1}))}}>Next</button>
                      </div>
                    </>
                  )}
                </div>
                )}
                {this.state.histories.length === 0 && !this.state.isLoading && (
                  <h1>Failed to load data</h1>
                )}

                {this.state.isLoading && (
                  <div className="w-100 d-flex justify-content-center">
                    <div className="spinner-border">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Transaction