import App from './containers/App.jsx'
import About from './containers/About.jsx'
import Inbox from './containers/Inbox.jsx'

export default {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'about', component: About },
    { path: 'inbox', component: Inbox }
  ]
}
