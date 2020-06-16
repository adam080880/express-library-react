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

import TransactionModel from '../models/transaction'
import Swal from 'sweetalert2'
import Select from 'react-select'

import BookModel from '../models/books'
import AuthorModel from '../models/authors'
import GenreModel from '../models/genres'

class Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detail: {},
      isOpen: false,
      promise_returned_at: '',
      book_id: this.props.match.params.id,
      form: 0,
      genres: [],
      authors: [],
      title: '',
      description: '',
      genre_id: '',
      author_id: '',
      file: [],
      file_: {},
      histories: []
    }
  }

  toggleModal = (param) => {
    this.getAuthorAndGenres()
    this.setState({
      isOpen: !this.state.isOpen,
      form: param
    })
  }

  handleImage = (e) => {
    this.setState({file: URL.createObjectURL(e.target.files[0]), file_: e.target.files[0]})
  }

  deleteBook = () => {

    Swal.fire({
      title: 'Are you sure delete this book?', 
      text: 'You can\'t recover this book and transactions with this book', 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    }).then((willDelete) => {
      if (willDelete.value) {
        const deleteBook = BookModel.delete(this.props.match.params.id)
        deleteBook.then((res) => {
          Swal.fire('Success deleted', 'Redirect to catalog', 'success').then(() => {
            this.props.history.push('/dashboard/catalog')
          })
        })
        .catch((rej) => {
          Swal.fire('Error', rej.response.data.msg, 'error')
        })
      } else {
      }
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

  updateBook = (e) => {
    e.preventDefault()

    if (this.state.file_.size > 0) {
      if(this.state.file_.size >= 1240000 || this.state.file_.type.split('/')[0] !== 'image') {
        Swal.fire('Failed', 'Max file size is 1240KB and file type just image', 'error')
        return ;
      }
    }

    let formData = new FormData()
    if (this.state.file_.size > 0) {
      formData.append('image', this.state.file_)
    }
    formData.set('title', this.state.title)
    formData.set('description', this.state.description)
    formData.set('author_id', this.state.author_id)
    formData.set('genre_id', this.state.genre_id)

    const patch = BookModel.patch(formData, this.props.match.params.id)
    patch.then((res) => {
      Swal.fire('Success', 'Book has been updated', 'success').then(() => {
        this.setState({
          isOpen: false,
        })
        this.findBook()
      })
    })
    .catch((rej) => {
      Swal.fire('Error', rej.response.data.msg, 'error')
    })
  }

  findBook = () => {
    const book = BookModel.find(this.props.match.params.id)
    book.then((res) => {
      this.setState({
        detail: res.data.data,
        title: res.data.data.title,
        description: res.data.data.description,
        genre_id: res.data.data.genre_id,
        author_id: res.data.data.author_id,
        histories: res.data.data.histories
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

  getAuthorAndGenres = () => {
    AuthorModel.get().then((res) => {
      this.setState({
        authors: res.data.data
      })
    })

    GenreModel.get().then((res) => {
      this.setState({
        genres: res.data.data
      })
    })
  }

  componentDidMount() {
    this.findBook()

    this.getAuthorAndGenres()
  }
  
  render() {
    return (
      <div className="container-fluid p-0 mb-5">
        {/* modal */}
          <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
            {this.state.form === 1 && (<ModalBody>
              <h3 className="mb-4 font-weight-bold">Booking</h3>
              <form method="post" onSubmit={this.booking}>
                <div className="form-group">
                  <label htmlFor="promised_returned_at" className="label-control">Return date</label>
                  <input className="form-control" type="date" name="promised_returned_at" id="promised_returned_at" onChange={(e) => this.setState({ promise_returned_at: e.target.value })} />
                </div>
                <button className="cta rounded-pill mt-3 mb-2 px-3 py-2 border-0 text-white" type="submit">Book</button>
                <button className="cta cta-secondary px-3 py-2 rounded-pill text-white border-0 ml-2 mt-3" type="button" onClick={this.toggleModal}>Close</button>
              </form>
            </ModalBody>)}
            {this.state.form === 2 && (<ModalBody>
              <form onSubmit={this.updateBook} method="post">
                <h3 className="mb-4 font-weight-bold">Edit Book</h3>
                <div className="form-group">
                  <label htmlFor="title" className="label-control">Title</label>
                  <input type="text" name="title" id="title" className="form-control" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} placeholder="title"/>
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="label-control">Description</label>
                  <textarea type="text" name="description" id="description" className="form-control" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} placeholder="description"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="genre" className="label-control">Genre</label>
                  <Select onChange={(value) => this.setState({ genre_id: value.value })} defaultValue={{label: this.state.genres.filter((val, index) => { return this.state.genre_id === val.id })[0].name, value: this.state.genre_id}} className="flex-grow-1" placeholder="Choose a genre" options={this.state.genres.map(val => Object({value: val.id, label: val.name}))}/>
                </div>
                <div className="form-group">
                  <label htmlFor="author" className="label-control">Author</label>
                  <Select onChange={(value) => this.setState({ author_id: value.value })} className="flex-grow-1" defaultValue={{label: this.state.authors.filter((val, index) => { return this.state.author_id === val.id })[0].name, value: this.state.author_id}} placeholder="Choose a author" options={this.state.authors.map((val) => { return { value: val.id, label: val.name } }) } />
                </div>
                <div className="form-group w-100 d-flex justify-content-center">
                  {(this.state.file.length > 0 || this.state.detail.image) && (<img src={this.state.file.length > 0 ? this.state.file : this.state.detail.image } alt="Preview" width="200px" className="m-auto"/>)}
                </div>
                <div className="form-group">
                  <input type="file" accept="image/*" name="file" id="file" onChange={this.handleImage}/>
                </div>
                <button type="submit" className="mt-4 cta rounded-pill px-3 text-white border-0 py-2">Submit</button>
                <button className="cta cta-secondary px-3 py-2 rounded-pill text-white border-0 ml-2 mt-3" type="button" onClick={this.toggleModal}>Close</button>
              </form>
            </ModalBody>)}
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
          <div className="position-absolute p-3 d-flex flex-row w-100 justify-content-between align-items-center">
            <div onClick={() => this.props.history.goBack()} className="rounded-circle bg-white d-flex align-items-center justify-content-center" style={{width: "35px", height: "35px", cursor: "pointer"}}>
              <i className="fas fa-arrow-left"></i>
            </div>
            {localStorage.getItem('session_user') && (JSON.parse(localStorage.getItem('session_user')).role === 'Super Admin' || JSON.parse(localStorage.getItem('session_user')).role === 'Admin') && (<div className="control">
              <button className="btn btn-danger" onClick={this.deleteBook}>
                <i className="fas fa-trash fa-sm"></i> 
              </button>
              <button className="btn btn-warning ml-2 text-white" onClick={(e) => this.toggleModal(2)}>
                <i className="fas fa-pen fa-sm"></i> 
              </button>
            </div>)}
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
                    {localStorage.getItem('token') && JSON.parse(localStorage.getItem('session_user')).role === 'Member' && (<div className="control d-flex align-items-center">
                      <button disabled={!(this.state.detail.status === 'available')} onClick={(e) => this.toggleModal(1)} className="rounded-pill mx-auto mx-lg-0 mt-3 mt-lg-0 cta border-0 px-4 py-2 text-white">Booking</button>
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
                  <span className="font-weight-bold mb-3"> History:</span><br/>
                  <div className="table-responsive">
                    <table className="table mt-3">
                      <thead className="thead">
                        <tr>
                          <th>Member</th>
                          <th>Last Updated</th>
                        </tr>
                      </thead>
                      <tbody className="tbody">
                        {this.state.histories.length > 0 && this.state.histories.map((val, index) => (
                          <tr key={index}>
                            <td>{val.member}</td>
                            <td>{val.last_updated}</td>
                          </tr>
                        ))}
                        {
                          this.state.histories.length === 0 && (
                            <tr>
                              <td colSpan={2} className="text-center">Histories is not found</td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
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