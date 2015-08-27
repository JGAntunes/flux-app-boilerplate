import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Col, Thumbnail } from 'react-bootstrap'

export default class User extends Component {
  static propTypes = {
    user: PropTypes.shape({
      login: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      name: PropTypes.string
    }).isRequired
  }

  render () {
    const { login, avatarUrl, name } = this.props.user

    return (
      <Col xs={6} sm={4} md={2} className='User'>
        <Link to={`/${login}`}>
          <Thumbnail src={avatarUrl} alt={name}>
            <h5>
              {login} {name && <span>({name})</span>}
            </h5>
          </Thumbnail>
        </Link>
      </Col>
    )
  }
}
