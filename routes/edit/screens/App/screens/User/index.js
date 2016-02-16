import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import {
  fetchGists,
  fetchUser,
  createGist
} from '../../../../actions'
import ProjectGrid from 'components/ProjectGrid'
import templates from './templates'

class User extends Component {
  componentDidMount () {
    const { fetchGists, fetchUser } = this.props

    fetchGists()
      .then(fetchUser)
  }

  onCreateProject () {
    const { username, createGist, redirectToGist } = this.props

    createGist(templates)
    .then(({result}) => {
      redirectToGist(username, result.id)
    })
  }

  render () {
    const { username, gists, path, createGist } = this.props

    return (
      <ProjectGrid gists={gists} username={username} createGist={::this.onCreateProject} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
    gists: state.gists
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchGists,
    fetchUser,
    createGist,
    redirectToGist: (username, gistId) => {
      dispatch(routeActions.push('/' + username + '/' + gistId))
    }
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
