import React from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalBody
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

import AuthorModel from '../models/authors'
import GenreModel from '../models/genres'

import Swal from 'sweetalert2'

class Config extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      form: '',
      authors: [],
      realAuthors: [],
      genres: [],
      realGenres: [],
      searchAuthor: '',
      authorData: {},
      authorName: '',
      authorDesc: '',
      authorId: '',
      searchGenre: '',
      genreName: '',
      genreId: ''
    }
  }

  componentDidMount() {
    this.fetchAuthor()
    this.fetchGenre()
  }

  trigger = async (form, data = {}) => {
    await this.setState({ form: form, isOpen: true })
    if (this.state.form === 'editAuthor') {
      this.setState({ authorName: data.name, authorDesc: data.description, authorId: data.id })
    } else if (this.state.form === 'addAuthor') {
      this.setState({ authorName: '', authorDesc: '', authorId: '' })
    } else if (this.state.form === 'editGenre') {
      this.setState({ genreName: data.name, genreId: data.id })
    } else if (this.state.form === 'addGenre') {
      this.setState({ genreName: '', genreId: '' })
    }
  }

  fetchAuthor = (param) => {
    AuthorModel.get().then((res) => {
      this.setState({
        authors: res.data.data,
        realAuthors: res.data.data
      })
    })
  }

  fetchGenre = (param) => {
    GenreModel.get().then((res) => {
      this.setState({
        genres: res.data.data,
        realGenres: res.data.data
      })
    })
  }

  searchAuthor = (e) => {
    e.preventDefault()
    this.setState({
      authors: this.state.realAuthors.map(val => Object({...val, ...{name: val.name.toLowerCase()}})).filter(obj => obj.name.includes(this.state.searchAuthor)).map(val => Object({...val, ...{name: val.name.split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1)).join(' ')}})),
    })
  }
  searchGenre = (e) => {
    e.preventDefault()
    this.setState({
      genres: this.state.realGenres.map(val => Object({...val, ...{name: val.name.toLowerCase()}})).filter(obj => obj.name.includes(this.state.searchGenre)).map(val => Object({...val, ...{name: val.name.split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1)).join(' ')}})),
    })
  }

  addAuthor = e => {
    e.preventDefault()

    const {authorName: name, authorDesc: description} = this.state

    AuthorModel.post({ name, description }).then((res) => {
      Swal.fire('Success', 'Success create author', 'success')
    })
    .catch((rej) => {
      Swal.fire('Error', rej.response.data.msg, 'error')
    })
    .finally(() => {
      this.fetchAuthor()
      this.toggleModal()
    })
  }
  addGenre = e => {
    e.preventDefault()

    const {genreName: name} = this.state

    GenreModel.post({ name }).then((res) => {
      Swal.fire('Success', 'Success create genre', 'success')
    })
    .catch((rej) => {
      Swal.fire('Error', rej.response.data.msg, 'error')
    })
    .finally(() => {
      this.fetchGenre()
      this.toggleModal()
    })
  }

  editAuthor = e => {
    e.preventDefault()

    const {authorName: name, authorDesc: description, authorId: id} = this.state

    AuthorModel.patch({ name, description, id }).then((res) => {
      Swal.fire('Success', 'Success update author', 'success')
    })
    .catch((rej) => {
      Swal.fire('Error', rej.response.data.msg, 'error')
    })
    .finally(() => {
      this.fetchAuthor()
      this.toggleModal()
    })
  }
  editGenre = e => {
    e.preventDefault()

    const {genreName: name, genreId: id} = this.state

    GenreModel.patch({ name, id }).then((res) => {
      Swal.fire('Success', 'Success update genre', 'success')
    })
    .catch((rej) => {
      Swal.fire('Error', rej.response.data.msg, 'error')
    })
    .finally(() => {
      this.fetchGenre()
      this.toggleModal()
    })
  }

  deleteAuthor = id => {
    Swal.fire({
      title: 'Are you sure to delete this author?',
      text: 'You can\'t recover this data',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.value) {
        AuthorModel.delete(id).then((res) => {
          Swal.fire('Success', 'Success delete author', 'success')
        })
        .catch((rej) => {
          Swal.fire('Error', rej.response.data.msg, 'error')
        })
        .finally(() => {
          this.fetchAuthor()
        })
      }
    })
  }
  deleteGenre = id => {
    Swal.fire({
      title: 'Are you sure to delete this genre?',
      text: 'You can\'t recover this data',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.value) {
        GenreModel.delete(id).then((res) => {
          Swal.fire('Success', 'Success delete genre', 'success')
        })
        .catch((rej) => {
          Swal.fire('Error', rej.response.data.msg, 'error')
        })
        .finally(() => {
          this.fetchGenre()
        })
      }
    })
  }

  renderAuthor = (val, index) => (
    <tr key={index}>
      <td>{val.name}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={e => this.deleteAuthor(val.id)}>
          <span className="fas fa-trash"></span>
        </button>
        <button className="btn btn-warning btn-sm ml-2" onClick={e => this.trigger('editAuthor', { id: val.id, name: val.name, description: val.description })}>
          <span className="fas fa-pen"></span>
        </button>
      </td>
    </tr>
  )
  renderGenre = (val, index) => (
    <tr key={index}>
      <td>{val.name}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={e => this.deleteGenre(val.id)}>
          <span className="fas fa-trash"></span>
        </button>
        <button className="btn btn-warning btn-sm ml-2" onClick={e => this.trigger('editGenre', { id: val.id, name: val.name })}>
          <span className="fas fa-pen"></span>
        </button>
      </td>
    </tr>
  )

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div className="container-fluid p-0 mb-5" style={{overflowX: 'hidden'}}>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          {(this.state.form === 'addAuthor' || this.state.form === 'editAuthor') && (<ModalBody>
            <form onSubmit={this.state.form === 'addAuthor' ? this.addAuthor : this.editAuthor}>
              <h3 className="mb-3">Manage Author</h3>
              <div className="form-group">
                <div className="label-control">Name</div>
                <input type="text" value={this.state.authorName} onChange={e => this.setState({authorName: e.target.value})} placeholder="Author name" className="form-control"/>
              </div>
              <div className="form-group">
                <div className="label-control">Description</div>
                <input type="text" onChange={e => this.setState({authorDesc: e.target.value})} placeholder="Author description" value={this.state.authorDesc} className="form-control"/>
              </div>
              <button className="cta px-3 py-2 rounded-pill text-white border-0 mt-3" type="submit">Submit</button>
              <button className="cta cta-secondary px-3 py-2 rounded-pill text-white border-0 ml-2 mt-3" type="button" onClick={this.toggleModal}>Close</button>
            </form>
          </ModalBody>)}
          {(this.state.form === 'addGenre' || this.state.form === 'editGenre') && (<ModalBody>
            <form onSubmit={this.state.form === 'addGenre' ? this.addGenre : this.editGenre}>
              <h3 className="mb-3">Manage Genre</h3>
              <div className="form-group">
                <div className="label-control">Name</div>
                <input type="text" value={this.state.genreName} onChange={e => this.setState({genreName: e.target.value})} placeholder="Genre name" className="form-control"/>
              </div>
              <button className="cta px-3 py-2 rounded-pill text-white border-0 mt-3" type="submit">Submit</button>
              <button className="cta cta-secondary px-3 py-2 rounded-pill text-white border-0 ml-2 mt-3" type="button" onClick={this.toggleModal}>Close</button>
            </form>
          </ModalBody>)}
        </Modal>
        <Breadcrumb>
          <BreadcrumbItem>
            <span>Dashboard</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/dashboard/config">Config</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="d-flex flex-row align-items-center justify-content-between px-4 pb-0 mt-3">
          <h3>Configs</h3>
        </div>
        <div className="row px-3">
          <div className="col-sm-6 mt-2">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="font-weight-bold">
                    Author Table
                  </span>
                  <div className="control d-flex align-items-center">
                    <form action="" onSubmit={this.searchAuthor} className="d-flex align-items-center">
                      <input type="text" onChange={e => this.setState({searchAuthor: e.target.value})} className="form-control" placeholder="Search authors" />
                    </form>
                    <button className="btn btn-primary btn-sm d-flex align-self-stretch align-items-center justify-content-center ml-2" onClick={e => this.trigger('addAuthor')}>
                      <span className="fas fa-plus mr-2"></span> Author
                    </button>
                  </div>
                </div>

                <div style={{overflowX: 'auto', overflowY: 'auto'}}>
                  <table className="mt-2 w-100 table mt-4">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.authors.map(this.renderAuthor)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 mt-2">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <span className="font-weight-bold">
                    Genre Table
                  </span>
                  <div className="control d-flex align-items-center">
                    <form action="" onSubmit={this.searchGenre} className="d-flex align-items-center">
                      <input type="text" onChange={e => this.setState({searchGenre: e.target.value})} className="form-control" placeholder="Search authors" />
                    </form>
                    <button className="btn btn-primary btn-sm d-flex align-self-stretch align-items-center justify-content-center ml-2" onClick={e => this.trigger('addGenre')}>
                      <span className="fas fa-plus mr-2"></span> Genre
                    </button>
                  </div>
                </div>

                <div style={{overflowX: 'auto', overflowY: 'auto'}}>
                  <table className="mt-2 w-100 table mt-4">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.genres.map(this.renderGenre)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Config
