import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import configureStore from '../store/configureStore'
import routes from '../routes'

const store = configureStore()

export default class Root extends Component {

  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object
  }

  render () {
    return (
      <div>
        <Provider store={store}>
          {() =>
            <Router history={this.props.history} children={routes} />
          }
        </Provider>
      </div>
    )
  }
}
