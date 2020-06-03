import React from 'react'

import Image from '../assets/img/mollie-sivaram-_1gBVgy8gIU-unsplash.png'
import Icon from '../assets/img/book (1).svg'

class Login extends React.Component {
  render() {
    return (
      <>
        <div className='auth_page'>
          <div className="image">
            <div className="layer"></div>
            <h1>Book is a window <br/> to the world</h1>
            <img src={Image} alt="library" />
          </div>
          <div className="form">
            <div className="top-right">
              <img src={Icon} alt="boook"/>
              <h2 style={{display: "inline-block"}}>Library</h2>
            </div>
            <form action="">
              <h1>Login</h1>
              <div className="description">
                Welcome Back, Please Login<br/>
                to your account
              </div>
              <div className="input-section">
                <div className="form-group">
                  <input type="text" name="email" id="email" placeholder="Email address"/>
                </div>
                <div className="form-group">
                  <input type="password" name="password" id="password" placeholder="Password"/>
                </div>
              </div>

              <div className="form-group-row">
                <div className="input-1">
                  <input type="checkbox" name="" id="Remember" /> <label for="Remember">Remember Me</label>
                </div>
                <div className="forgot">
                  Forgot Password
                </div>
              </div>

              <div className="form-group-row but-not-space-between">
                <button className="cta-login bt">Login</button>
                <button className="secondary-register bt">Register</button>
              </div>

              <div className="terms">
                By signing up, you agree to Book’s<br/>
                <span>Terms and Conditions</span> & <span>Privacy Policy</span>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login