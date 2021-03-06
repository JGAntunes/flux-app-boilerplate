import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Explore from '../components/Explore.jsx'
import { resetErrorMessage } from '../actions'

class App extends Component {

  static propTypes = {
    errorMessage: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }),
    params: PropTypes.shape({
      userLogin: PropTypes.string,
      repoName: PropTypes.string
    }).isRequired,
    resetErrorMessage: PropTypes.func,
    children: PropTypes.node
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  render () {
    // Injected by React Router
    const { location, children } = this.props
    const { pathname } = location
    const value = pathname.substring(1)

    return (
      <div className='container'>
        <h1>Flux App</h1>
        <Explore value={value} onChange={this.handleChange} />
        <hr />
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }

  renderErrorMessage () {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href='#'
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  handleDismissClick (e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange (nextValue) {
    // Available thanks to contextTypes below
    const { router } = this.context
    router.transitionTo(`/${nextValue}`)
  }
}

function mapStateToProps (state) {
  return {
    errorMessage: state.errorMessage
  }
}

export default connect(
  mapStateToProps,
  { resetErrorMessage }
)(App)
