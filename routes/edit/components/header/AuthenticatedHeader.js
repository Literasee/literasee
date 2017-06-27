import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Logo from './Logo'
import Overlay from '../overlay'

import styles from './header.styl'

class AuthenticatedHeader extends Component {
  constructor() {
    super()
    this.state = {}

    this.createProject = this.createProject.bind(this)
  }

  componentDidMount() {
    fetch('https://api.github.com/user', {
      headers: {
        Authorization: 'token ' + this.props.token,
        Accept: 'application/vnd.github.v3',
      },
    })
      .then(req => req.json(), err => console.error(err))
      .then(user => {
        this.setState({ user })
      })
  }

  createProject() {
    const { history, username } = this.props

    Overlay.show()
    fetch('/api/create', {
      credentials: 'include',
    })
      .then(req => req.json(), err => console.error(err))
      .then(res => {
        Overlay.hide()
        if (res.name) history.push(`/${username}/${res.name}/edit`)
      })
  }

  render() {
    const { user } = this.state

    return (
      <header className={styles.container + ' container-fluid'}>
        <div>
          <button
            type="button"
            name="button"
            className="btn btn-primary"
            onClick={this.createProject}
          >
            Create a Project
          </button>
        </div>
        <div><a href="/"><Logo scale="0.6" /></a></div>
        <div>
          <nav role="navigation" className="pure-menu pure-menu-horizontal">
            <ul className="list-inline list-unstyled cf fl-right">
              <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                {user &&
                  <a className={styles.avatarLink + ' pure-menu-link'}>
                    <img src={`${user.avatar_url}&s=40`} width="40" height="40" />
                    {user.name}
                  </a>}
                <ul className="pure-menu-children">
                  <li className="pure-menu-item">
                    <a href="/logout" className="pure-menu-link">Log out</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}

export default withRouter(AuthenticatedHeader)
