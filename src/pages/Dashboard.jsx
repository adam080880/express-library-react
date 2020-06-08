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

import Catalog from './Catalog'
import Detail from './Detail'

import Swal from 'sweetalert2'

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
      authors: []
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
                  <div className="w-100">
                    <select name="genre" id="genre" className="form-control" onChange={(e) => this.setState({genre_id: e.target.value})}>
                      <option value="">Choose a genre</option>
                      {this.state.genres.map(this.renderGenre)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="author" className="label-control">Author</label>
                  <div className="w-100">
                    <select name="author" id="author" className="form-control" onChange={(e) => this.setState({author_id: e.target.value})}>
                      <option value="">Choose a author</option>
                      {this.state.authors.map(this.renderAuthor)}
                    </select>
                  </div>
                </div>
              </ModalBody>
            </form>)}
            {/* Form Add Book */}
            
          </Modal>
        {/* End Modal */}
          <div className="container-fluid px-0">
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
                        {this.state.session_user && (<div className="nav-item">
                          <Link to="/dashboard/history" className="nav-link ml-0 pl-0">History</Link>
                        </div>)}
                        {this.state.session_user && 
                          !this.state.session_user.name && (<div className="nav-item">
                            <Link to="#" onClick={() => this.toggle(1)} className="nav-link ml-0 pl-0">Complete Biodata</Link>
                          </div>)
                        }
                        {this.state.session_user && (this.state.session_user.role.toLowerCase() === 'super admin' || this.state.session_user.role.toLowerCase() === 'admin') && (<div className="nav-item">
                          <Link to="#" onClick={() => this.toggle(2)} className="nav-link ml-0 pl-0">Add Book</Link>
                        </div>)}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-sidebar-secondary small">
                    &copy; Copyright <b>EXP.L!bs</b>
                  </div>
                </div>
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
                  <ul className="navbar-nav d-md-none d-sm-none d-xs-none d-lg-block d-none">
                    {localStorage.getItem('token') && (
                      <li className="nav-item">
                        <Link to="#" className="nav-link btn btn-danger text-white font-weight-bold ml-3" onClick={this.logout}>Logout</Link>
                      </li>
                    )}
                    {!localStorage.getItem('token') && (
                      <li className="nav-item">
                      <Link to="/auth/login" className="btn btn-outline-primary font-weight-bold ml-3">Login</Link>
                    </li>
                    )}
                  </ul>
                </div>

                  <Route exact path="/dashboard/catalog" component={Catalog} />
                  <Route exact path="/dashboard/catalog/detail/:id" component={Detail} />
                  <Route exact path="/dashboard/history" component={Detail} />
              </Col>
            </Row>
          </div>
        </>
      </Switch>
    )
  }
}

export default Dashboard