import 'babel-core/polyfill'
import React from 'react'
import Root from '../app/containers/Root.jsx'
import BrowserHistory from 'react-router/lib/BrowserHistory'

React.render(
  <Root history={new BrowserHistory()} />,
  document.getElementById('root')
)
