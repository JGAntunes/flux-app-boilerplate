import App from './containers/App.jsx'
import UserPage from './containers/UserPage.jsx'
import RepoPage from './containers/RepoPage.jsx'

export default {
  path: '/',
  component: App,
  childRoutes: [
    { path: '/:login/:name', component: RepoPage },
    { path: '/:login', component: UserPage }
  ]
}
