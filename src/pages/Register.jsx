import React from 'react'

import {Row, Col, Form, Input, Button} from 'reactstrap'
import Logo from '../assets/img/book (1).svg'

import {
  Link
} from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  register = (e) => {
    e.preventDefault()
    this.props.history.push('/login')
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
                <Form onSubmit={this.register}>
                  <h1>Register</h1>
                  <p>Welcome back, please Create your account</p>
                  <div className="shadow-sm mb-3" id="inputWrapper">
                    <Input type="text" placeholder="Username" className="rounded-0 p-4 focus-no-outline"/>
                    <Input type="password" placeholder="Password" className="rounded-0 border-top-0 p-4 focus-no-outline"/>
                    <Input type="text" placeholder="Full Name" className="rounded-0 border-top-0 p-4 focus-no-outline"/>
                    <Input type="text" placeholder="Email" className="rounded-0 border-top-0 p-4 focus-no-outline"/>
                  </div>
                  <Button className='btn-dark'>Sign Up</Button>
                  <Link to="/login" className='ml-2 btn btn-outline-secondary'>Login</Link>
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

export default Register