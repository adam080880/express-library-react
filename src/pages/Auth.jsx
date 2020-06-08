import React from 'react'

import {
  FormGroup,
  Input,
  Label,
  Button,
  Card,
  CardBody,
} from 'reactstrap'

import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Swal from 'sweetalert2'

import AuthModel from '../models/auth'

class Auth extends React.Component {
  constructor(props) {
    super(props)

    if (localStorage.getItem('token')) {
      props.history.push('/dashboard/catalog')
    }

    this.state = {
      email: '',
      password: '',
      cpassword: '',
      isLoading: false,
      success: false
    }
  }

  login = (e) => {
    e.preventDefault()
    this.setState({
      isLoading: true
    })

    const { password, email } = this.state

    if (email.length < 1 || password.length < 1) {
      Swal.fire(
        'Register Failed',
        'All field must be filled',
        'error'
      )
    }

    const login = AuthModel.login(this.state)
    login.then((res) => {
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('session_user', JSON.stringify(res.data.data))
      Swal.fire(
        'Login Success',
        'Redirect to catalog',
        'success'
      ).then(() => {
        this.setState({
          isLoading: true
        })

        setTimeout(() => {
          this.props.history.push('/dashboard/catalog')
        }, 1000)
      })
    })
    .catch((rej) => {
      Swal.fire(
        'Login Failed',
        rej.response.data.msg,
        'error'
      )
    })
    .finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  register = (e) => {
    e.preventDefault()

    const { cpassword, password, email } = this.state

    if (cpassword !== password) {
      Swal.fire(
        'Register Failed',
        'Confirm password and password are not equals',
        'error'
      )
      return ;
    }

    if (email.length < 1 || password.length < 1 || cpassword.length < 1) {
      Swal.fire(
        'Register Failed',
        'All field must be filled',
        'error'
      )
    }

    const regis = AuthModel.register(this.state)
    regis.then((res) => {
      Swal.fire(
        'Register Success',
        'Redirect to login',
        'success'
      ).then(() => {
        this.setState({
          isLoading: true
        })

        setTimeout(() => {
          this.setState({
            isLoading: false
          })

          this.props.history.push('/auth/login')
        }, 1000)
      })
    })
    .catch((rej) => {
      Swal.fire(
        'Login Failed',
        rej.response.data.msg,
        'error'
      )
    })
    .finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  render() {
    return (
      <>
        <div className="py-5"></div>
        <Card color="white" className="auth-box mx-auto shadow-sm p-3 border-0 rounded-0">
          {!this.state.isLoading && (
            <CardBody>
              <Switch>
                <Route exact path="/auth/login">
                  <h4 className="mb-3 font-weight-bold">Login</h4>
                  <form onSubmit={this.login}>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input type="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} id="email" placeholder="Your Email"/>
                    </FormGroup>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} id="password" placeholder="Your Password" autoComplete={"true"} />
                    </FormGroup>
                    <div className="d-flex flex-column align-items-center mt-4">
                      <Button type="submit" className="px-4 rounded-pill cta border-0 align-self-stretch">Login</Button>
                      <small className="mt-3">Not have an account? <Link to="/auth/register">Register</Link></small>
                    </div>
                  </form>
                </Route>
                <Route exact path="/auth/register">
                <h4 className="mb-3 font-weight-bold">Register</h4>
                  <form onSubmit={this.register}>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} id="email" placeholder="email"/>
                    </FormGroup>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input type="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} id="password" placeholder="password" autoComplete={"false"}/>
                    </FormGroup>
                    <FormGroup>
                      <Label>Confirm Password</Label>
                      <Input type="password" value={this.state.cpassword} onChange={(e) => this.setState({cpassword: e.target.value})} id="c_password" placeholder="Confirm password" autoComplete={"false"}/>
                    </FormGroup>
                    <div className="d-flex flex-column align-items-center mt-4">
                      <Button type="submit" className="px-4 rounded-pill cta border-0 align-self-stretch">Register</Button>
                      <small className="mt-3">Already have an account? <Link to="/auth/login">Login</Link></small>
                    </div>
                  </form>
                </Route>
              </Switch>
            </CardBody>
          )}
          {this.state.isLoading && (
            <div className="spinner-border text-main my-5 mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </Card>

      </>
    )
  }
}

export default Auth
