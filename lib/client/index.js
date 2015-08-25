import React from 'react'
import { Router } from 'react-router'
import { history } from 'react-router/lib/BrowserHistory'
import routes from 'lib/app/routes'

React.render(<Router history={history} children={routes}/>, document.getElementById('react-view'))
