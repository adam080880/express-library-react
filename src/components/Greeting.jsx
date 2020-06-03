import React from 'react'
import Button from './atoms/Button/Button'

class Greetings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.name || 'Name'
    }
  }

  render() {
    return (
      <p>
        Hello {this.state.user}, Welcome to my react app
        <Button>Test</Button>
      </p>
    )
  }
}

export default Greetings