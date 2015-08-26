import React from 'react'
import { Link } from 'react-router'

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }
  render () {
    return (
      <div>
        <h1>App</h1>
        {/* change the <a>s to <Links>s */}
        <ul>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/inbox'>Inbox</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
}

export default App
