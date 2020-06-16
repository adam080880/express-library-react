import React from 'react'

import {
  Row, Col, Modal, ModalBody
} from 'reactstrap'

import {
  Link,
  Switch,
  Route
} from 'react-router-dom'

import AuthModel from '../models/auth'
import GenreModel from '../models/genres'
import AuthorModel from '../models/authors'
import BookModel from '../models/books'

import Catalog from './Catalog'
import Detail from './Detail'
import Transaction from './Transaction'
import Config from './Config'
import User from './User'

import Swal from 'sweetalert2'
import Select from 'react-select'

import qs from 'querystring'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    const session_user = JSON.parse(localStorage.getItem('session_user'))

    this.state = {
      session_user: session_user,
      isOpen: false,
      nameRegis: '',
      birthRegis: '',
      phoneRegis: '',
      genderRegis: '',
      currentForm: 0,
      genres: [],
      authors: [],
      title: '',
      description: '',
      author_id: '',
      genre_id: '',
      file: [],
      file_: {},
    }
  }

  componentDidMount() {
    this.fetchGenres()
    this.fetchAuthors()
  }

  fetchGenres = () => {
    GenreModel.get().then((res) => {
      this.setState({genres: res.data.data})
    })
  }

  fetchAuthors = () => {
    AuthorModel.get().then((res) => {
      this.setState({authors: res.data.data})
    })
  }

  toggle = (form) => {
    this.setState({
      isOpen: !this.state.isOpen,
      currentForm: form,
    })
  }

  completeRegis = (e) => {
    e.preventDefault()
    const { nameRegis: name, phoneRegis: phone, birthRegis: birth, genderRegis: gender } = this.state
    const complete = AuthModel.completeRegis({ name, phone, birth, gender })
    complete.then((res) => {
      Swal.fire(
        'Complete',
        'Redirect to Login',
        'success'
      ).then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('session_auth')
        this.props.history.push('/auth/login')
      })
    })
    .catch((rej) => {
      Swal.fire(
        'Error',
        rej.response.data.msg,
        'error'
      )
    })
  }

  submitForm = (e) => {
    e.preventDefault()

    if (this.state.file_.size) {
      if(this.state.file_.size >= 1240000 || this.state.file_.type.split('/')[0] !== 'image') {
        Swal.fire('Failed', 'Max file size is 1240KB and file type just image', 'error')
        return ;
      }
    } else {
      Swal.fire('Failed', 'Image is required', 'error')
      return ;
    }

    let formData = new FormData()
    formData.append('image', this.state.file_)
    formData.set('title', this.state.title)
    formData.set('description', this.state.description)
    formData.set('author_id', this.state.author_id)
    formData.set('genre_id', this.state.genre_id)

    const post = BookModel.post(formData)
    post.then((res) => {
      Swal.fire('Success', 'Book has been created', 'success').then(() => {
        this.setState({
          isOpen: false,
        })
        if (this.props.location.pathname === '/dashboard/catalog') {
          this.props.history.push(`/dashboard/catalog?${qs.stringify({...qs.parse(this.props.location.search.slice(1))})}`, {isFetching: true})
        } else {
          this.props.history.push('/dashboard/catalog?page=1', {isFetching: true})
        }
      })
    })
    .catch((rej) => {
      Swal.fire('Error', rej.response.data.msg, 'error')
    })
  }

  renderGenre = (val, index) => (
    <option value={val.id}>{val.name}</option>
  )

  renderAuthor = (val, index) => (
    <option value={val.id}>{val.name}</option>
  )

  logout = (e) => {
    AuthModel.logout()
    this.props.history.push('/auth/login')
  }

  render() {
    return (
      <Switch>
        <>
        {/* Modal */}
          <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
            {/* Form Biodata */}
              {this.state.currentForm === 1 && (<form method="post" onSubmit={this.completeRegis}>
                <ModalBody>
                  <h3 className="font-weight-bold mb-4">Complete Biodata</h3>
                  <div className="form-group">
                    <label htmlFor="name" className="label-control">Name</label>
                    <input type="text" name="name" id="name" className="form-control" placeholder="name" onChange={(e) => {this.setState({nameRegis: e.target.value})}}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="birth" className="label-control">birth</label>
                    <input type="date" name="birth" id="birth" className="form-control" onChange={(e) => {this.setState({birthRegis: e.target.value})}}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="label-control">Phone</label>
                    <input type="text" name="phone" id="phone" onChange={(e) => {this.setState({phoneRegis: e.target.value})}} className="form-control" placeholder="phone"/>
                  </div>
                  <div className="form-group ml-0 pl-0" onChange={(e) => {this.setState({genderRegis: e.target.value})}}>
                    <label htmlFor="">Gender</label> <br/>
                    <div className="custom-control custom-radio custom-control-inline ml-0">
                      <input type="radio" value="m" name="gender" className="custom-control-input" id="l"/>
                      <label htmlFor="l" className="custom-control-label">Man</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input type="radio" value="f" name="gender" className="custom-control-input" id="p"/>
                      <label htmlFor="p" className="custom-control-label">Woman</label>
                    </div>
                  </div>
                  <button type="submit" className="mt-4 cta rounded-pill px-3 text-white border-0 py-2">Submit</button>
                  <button className="cta cta-secondary px-3 py-2 rounded-pill text-white border-0 ml-2 mt-3" type="button" onClick={e => this.toggle(0)}>Close</button>
                </ModalBody>
              </form>)}
            {/* Form Biodata */}

            {/* Form Add Book */}
            {this.state.currentForm === 2 && (<form method="post" onSubmit={this.submitForm}>
              <ModalBody>
                <h3 className="font-weight-bold mb-3">Add Book</h3>
                <div className="form-group">
                  <label htmlFor="title" className="label-control">Title</label>
                  <input type="text" name="title" id="title" className="form-control" onChange={(e) => this.setState({title: e.target.value})} placeholder="title"/>
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="label-control">Description</label>
                  <textarea type="text" name="description" id="description" className="form-control" onChange={(e) => this.setState({description: e.target.value})} placeholder="description"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="genre" className="label-control">Genre</label>
                  <Select onChange={(value) => this.setState({ genre_id: value.value })} className="flex-grow-1" placeholder="Choose a genre" options={this.state.genres.map(val => Object({value: val.id, label: val.name}))}/>
                </div>
                <div className="form-group">
                  <label htmlFor="author" className="label-control">Author</label>
                  <Select onChange={(value) => this.setState({ author_id: value.value })} className="flex-grow-1" placeholder="Choose a author" options={this.state.authors.map((val) => { return { value: val.id, label: val.name } }) } />
                </div>
                <div className="form-group w-100 d-flex justify-content-center">
                  {this.state.file.length > 0 && (<img src={this.state.file} alt="Preview" width="200px" className="m-auto"/>)}
                </div>
                <div className="form-group">
                  <input type="file" accept="image/*" name="file" id="file" onChange={(e) => this.setState({file: URL.createObjectURL(e.target.files[0]), file_: e.target.files[0]})}/>
                </div>
                <button type="submit" className="mt-4 cta rounded-pill px-3 text-white border-0 py-2">Submit</button>
                <button className="cta cta-secondary px-3 py-2 rounded-pill text-white border-0 ml-2 mt-3" type="button" onClick={e => this.toggle(0)}>Close</button>
              </ModalBody>
            </form>)}
            {/* Form Add Book */}
            
          </Modal>
        {/* End Modal */}
          <div className="container-fluid px-0">
            <div className="bottom-bar border d-block d-lg-none px-3 py-2 position-fixed flex-row d-flex bg-white shadow-sm align-items-center justify-content-between" style={{width: "100%", bottom: 0, zIndex: 100, overflowX: 'auto'}}>
              <div className="d-flex align-items-center flex-column flex-grow-1 text-center justify-content-center">
                  <Link to="/dashboard/catalog" style={{fontSize: "13px"}} className="ml-0 pl-0 text-dark">
                  <span style={{fontSize: "18px", textAlign: "center"}} className="fas fa-book mb-1 d-block text-dark"></span>
                    <span style={{fontSize: '13px', color: 'black'}}>Catalog</span>
                  </Link>
              </div>
              {this.state.session_user && this.state.session_user.name && (<div className="d-flex align-items-center flex-column flex-grow-1 text-center justify-content-center">
                <div className="d-flex align-items-center flex-column justify-content-center">
                  <Link to="/dashboard/history" style={{fontSize: "13px"}} className="ml-0 pl-0">
                    <span style={{fontSize: "18px", textAlign: "center"}} className="fas fa-history mb-1 text-dark d-block"></span>
                    <span style={{fontSize: '13px', color: 'black'}}>History</span>
                  </Link>
                </div>
              </div>)}
              {this.state.session_user && 
                !this.state.session_user.name && (<div className="d-flex align-items-center flex-column justify-content-center flex-grow-1 text-center">
                <div className="d-flex align-items-center flex-column justify-content-center">
                  <Link to="#" onClick={e => {e.preventDefault(); this.toggle(1)}} style={{fontSize: "13px"}} className="ml-0 pl-0">
                    <span style={{fontSize: "18px", textAlign: "center"}} className="fas fa-scroll mb-1 text-dark d-block"></span>
                    <span style={{fontSize: '13px', color: 'black'}}>Biodata</span>
                  </Link>
                </div>
              </div>)}
              {this.state.session_user && (this.state.session_user.role.toLowerCase() === 'super admin' || this.state.session_user.role.toLowerCase() === 'admin') && (<div className="d-flex align-items-center flex-column justify-content-center flex-grow-1 text-center">
                <Link to="#" onClick={e => {e.preventDefault(); this.toggle(2); this.fetchAuthors(); this.fetchGenres()}} style={{fontSize: "13px"}} className="ml-0 pl-0">
                    <span style={{fontSize: "18px", textAlign: "center"}} className="fas fa-plus mb-1 text-dark d-block"></span>
                    <span style={{fontSize: '13px', color: 'black'}}>Add Book</span>
                  </Link>
              </div>)}
              {this.state.session_user && (this.state.session_user.role.toLowerCase() === 'super admin' || this.state.session_user.role.toLowerCase() === 'admin') && (<div className="d-flex align-items-center flex-column justify-content-center flex-grow-1 text-center">
                  <Link to="/dashboard/users" style={{fontSize: "13px"}} className="ml-0 pl-0">
                    <span style={{fontSize: "18px", textAlign: "center"}} className="fas fa-users mb-1 text-dark d-block"></span>
                    <span style={{fontSize: '13px', color: 'black'}}>Users</span>
                  </Link>
              </div>)}
              {this.state.session_user && (this.state.session_user.role.toLowerCase() === 'super admin' || this.state.session_user.role.toLowerCase() === 'admin') && (<div className="d-flex align-items-center flex-column justify-content-center flex-grow-1 text-center">
              <Link to="/dashboard/configs" style={{fontSize: "13px"}} className="ml-0 pl-0">
                    <span style={{fontSize: "18px", textAlign: "center"}} className="fas fa-cog mb-1 text-dark d-block"></span>
                    <span style={{fontSize: '13px', color: 'black'}}>Configs</span>
                  </Link>
              </div>)}
            </div>
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
                        {this.state.session_user && this.state.session_user.name && (<div className="nav-item">
                          <Link to="/dashboard/history" className="nav-link ml-0 pl-0">History Transaction</Link>
                        </div>)}
                        {this.state.session_user && 
                          !this.state.session_user.name && (<div className="nav-item">
                            <Link to="#" onClick={e => {e.preventDefault(); this.toggle(1)}} className="nav-link ml-0 pl-0">Complete Biodata</Link>
                          </div>)}
                        {this.state.session_user && (this.state.session_user.role.toLowerCase() === 'super admin' || this.state.session_user.role.toLowerCase() === 'admin') && (<div className="nav-item">
                          <Link to="#" onClick={e => {e.preventDefault(); this.toggle(2); this.fetchAuthors(); this.fetchGenres()}} className="nav-link ml-0 pl-0">Add Book</Link>
                        </div>)}
                        {this.state.session_user && (this.state.session_user.role.toLowerCase() === 'super admin' || this.state.session_user.role.toLowerCase() === 'admin') && (<div className="nav-item">
                          <Link to="/dashboard/users" className="nav-link ml-0 pl-0">Users</Link>
                        </div>)}
                        {this.state.session_user && (this.state.session_user.role.toLowerCase() === 'super admin' || this.state.session_user.role.toLowerCase() === 'admin') && (<div className="nav-item">
                          <Link to="/dashboard/configs" className="nav-link ml-0 pl-0">Configs</Link>
                        </div>)}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-sidebar-secondary small">
                    &copy; Copyright <b>EXP.L!bs</b>
                  </div>
                </div>
              </div>
              <Col className="px-0 mb-5 mb-lg-0">
                <div className="navbar navbar-expand-lg sticky-top navbar-light bg-white shadow-sm d-flex flex-row justify-content-between align-items-center px-4" style={{height: "70px"}}>
                  <Link className="navbar-brand font-weight-bold" to="/">
                    EXP.L!bs
                  </Link>
                  <ul className="navbar-nav">
                    {localStorage.getItem('token') && (
                      <li className="nav-item">
                        <Link to="#" className="px-3 nav-link btn btn-danger text-white font-weight-bold  btn-sm ml-3" onClick={this.logout}>Logout</Link>
                      </li>
                    )}
                    {!localStorage.getItem('token') && (
                      <li className="nav-item">
                      <Link to="/auth/login" className="btn btn-outline-primary font-weight-bold ml-3">Login</Link>
                    </li>
                    )}
                  </ul>
                </div>

                  <Route exact path="/dashboard/history" component={Transaction} />
                  <Route exact path="/dashboard/catalog" component={Catalog} />
                  <Route exact path="/dashboard/configs" component={Config} />
                  <Route exact path="/dashboard/users" component={User} />
                  <Route exact path="/dashboard/catalog/detail/:id" component={Detail} />
              </Col>
            </Row>
          </div>
        </>
      </Switch>
    )
  }
}

export default Dashboard