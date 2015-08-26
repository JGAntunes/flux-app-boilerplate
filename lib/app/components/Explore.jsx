import React, { Component, PropTypes } from 'react'
import { Input, Button, Panel } from 'react-bootstrap'

const GITHUB_REPO = 'https://github.com/gaearon/redux'

export default class Explore extends Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleGoClick = this.handleGoClick.bind(this)
  }

  getInputValue () {
    return this.refs.input.getValue()
  }

  render () {
    const innerButton = (<Button type='submit' onClick={this.handleGoClick}>Go!</Button>)

    return (
      <Panel>
        <p>Type a username or repo full name and hit 'Go':</p>
        <form>
          <Input type='text' ref='input' defaultValue={this.props.value} onKeyUp={this.handleKeyUp} buttonAfter={innerButton} />
        </form>

        <p>
          Code on <a href={GITHUB_REPO} target='_blank'>Github</a>.
        </p>
      </Panel>
    )
  }

  handleGoClick (e) {
    e.preventDefault()
    this.props.onChange(this.getInputValue())
  }
}
