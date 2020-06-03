import React, {Component} from 'react'

import Button from '../components/atoms/Button/Button'

class Text extends Component {
  constructor(props) {
    super(props)

    console.log('This is constructor, i was running before this component will be rendered')
  }

  componentDidMount() {
    console.log('Component has been rendered')
  }
  
  componentWillUnmount() {
    console.log('Component has been deleted')
  }

  render() {
    return (
      <>
        Hello
      </>
    )
  }
}

class Login_ extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      delete: true
    }

    this.login = this.login.bind(this)
  }

  login(e) {
    e.preventDefault()

    console.log('Email:', this.state.email)
    console.log('Password:', this.state.password)
  }

  render() {
    return (
      <>
        {this.state.delete && <Text/> }
        <Button hierarcy="primary" onClick={e => this.setState({delete: !this.state.delete})}>Toggle</Button>
        <form onSubmit={this.login}>
          <input type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
          <input type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
          <Button type="submit" hierarcy="warning">Login</Button>
        </form>
      </>
    )
  }
}

export default Login_
