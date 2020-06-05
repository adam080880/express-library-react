import React from 'react'

import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'
import Logo from '../assets/img/book (1).svg'

import {
  Link
} from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    // const stateHistory = this.props.location.state
  }

  login = (e) => {
    e.preventDefault()
    this.props.history.push('/catalog', {
      isLogin: true
    })
  }

  render() {
    return (
      <>
        <Row className='h-100 no-gutters'>
          <Col md={8} sm={12} className='login-cover'>
            <div className="d-flex flex-column login-overlay w-100 h-100 justify-content-between">
              <h1 className='text-white font-weight-bold mt-5 display-3'>Book is a window to the world</h1>
              <div className='text-white'>Photo by Mark Pan4ratte on Unsplash</div>
            </div>
          </Col>
          <Col md={4} sm={12}>
            <div className="d-flex w-100 h-100 flex-column">
              <div className='d-flex justify-content-end'>
                <img className="p-3" width={80} src={Logo} alt="Logo" />
              </div>
              <div className="flex-grow-1 d-flex justify-content-start align-items-center ml-5">
                <Form onSubmit={this.login}>
                  <h1>Login</h1>
                  <p>Welcome back, please login to your account</p>
                  <div className="shadow-sm mb-3" id="inputWrapper">
                    <Input type="text" placeholder="Email" className="rounded-0 border-top p-4 focus-no-outline"/>
                    <Input type="password" placeholder="Password" className="rounded-0 border-top-0 p-4 focus-no-outline"/>
                  </div>
                  <div className="d-flex flex-row justify-content-between mb-2">
                    <FormGroup check>
                        <Label check>
                          <Input type="checkbox" />
                          <span>Remember Me</span>
                        </Label>
                    </FormGroup>
                    <div>Forgot Password</div>
                  </div>
                  <Button className="btn-dark">Login</Button>
                  <Link to="/register" className='ml-2 btn btn-outline-secondary'>Sign Up</Link>
                </Form>
              </div>
              <div className="d-flex flex-column p-3">
                <div>By signing up, you agree with to Book's</div>
                <div>Terms and Conditions &amp; Privacy Policy</div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default Login