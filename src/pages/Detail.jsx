import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody
} from 'reactstrap'

import {
  Link,
} from 'react-router-dom'

import BookModel from '../models/books'
import TransactionModel from '../models/transaction'
import Swal from 'sweetalert2'

class Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detail: {},
      isOpen: false,
      promise_returned_at: '',
      book_id: this.props.match.params.id
    }
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  booking = (e) => {
    e.preventDefault()

    const booking = TransactionModel.booking(this.props.match.params.id, this.state)
    booking.then((res) => {
      Swal.fire(
        'Success',
        'Booking success',
        'success'
      ).then(() => {
        this.props.history.push('/dashboard/catalog')
      })
    })
    .catch((rej) => {
      Swal.fire(
        'Failed',
        rej.response.data.msg,
        'error'
      )
    })
  }

  componentDidMount() {
    const book = BookModel.find(this.props.match.params.id)
    book.then((res) => {
      this.setState({
        detail: res.data.data,
      })
    })
    .catch((rej) => {
      Swal.fire(
        'Failed to get book',
        rej.response.data.msg,
        'error'
      ).then(() => {
        this.props.history.push('/dashboard/catalog')
      })
    })
  }
  
  render() {
    return (
      <div className="container-fluid p-0 mb-5">
        {/* modal */}
          <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
            <ModalBody>
              <h3 className="mb-4 font-weight-bold">Booking</h3>
              <form method="post" onSubmit={this.booking}>
                <div className="form-group">
                  <label htmlFor="promised_returned_at" className="label-control">Return date</label>
                  <input className="form-control" type="date" name="promised_returned_at" id="promised_returned_at" onChange={(e) => this.setState({ promise_returned_at: e.target.value })} />
                </div>
                <button className="cta rounded-pill mt-3 mb-2 px-3 py-2 border-0 text-white" type="submit">Book</button>
              </form>
            </ModalBody>
          </Modal>
        {/* modal */}
        <Breadcrumb>
          <BreadcrumbItem>
            <span>Dashboard</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/dashboard/catalog">Catalog</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={`/dashboard/catalog/detail/${this.props.match.params.id}`}>Book Id #{`${this.props.match.params.id}`}</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="w-100 bg-secondary" style={{height: "280px", backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${this.state.detail.image})` }}>
          <div onClick={() => this.props.history.push('/dashboard/catalog')} className="position-absolute rounded-circle bg-white m-3 d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px", cursor: "pointer"}}>
            <i className="fas fa-arrow-left"></i>
          </div>
        </div>
        <div className="container">
          <div className="card border-0 shadow-sm" style={{marginTop: "-80px"}}>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-3 mb-3 col-12 order-1 order-lg-2 d-flex align-items-center flex-column">
                  <img src={`${this.state.detail.image}`} alt="" className="cover" width="200px" style={{borderRadius: "10px"}}/>
                </div>
                <div className="col-12 col-lg-9 order-2 order-lg-1 mb-3 text-center text-lg-left">
                  <div className="d-flex justify-content-between flex-column flex-lg-row aign-items-center mb-3">
                    <div className="title">
                      <h3 className="font-weight-bold mb-1">{this.state.detail.title}</h3>
                      <div className="badge badge-secondary">{this.state.detail.genre}</div>
                    </div>
                    {localStorage.getItem('token') && (<div className="control d-flex align-items-center">
                      <button disabled={!(this.state.detail.status === 'available')} onClick={this.toggleModal} className="rounded-pill mx-auto mx-lg-0 mt-3 mt-lg-0 cta border-0 px-4 py-2 text-white">Booking</button>
                    </div>)}
                  </div>
                  <ul className="list-style-type-none list-unstyled">
                    <li className="mb-1 mb-lg-0">
                      <span className="font-weight-bold d-block d-lg-inline">Author:</span> {this.state.detail.author}
                    </li>
                    <li className="mb-1 mb-lg-0">
                      <span className="font-weight-bold d-block d-lg-inline">Status:</span> <span className={`${(this.state.detail.status === 'available') ? 'text-success' : 'text-danger'}`}>{this.state.detail.status}</span>
                    </li>
                    <li>
                      <span className="font-weight-bold"> Description:</span><br/>
                      <p className="description">
                        { this.state.detail.description}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Detail