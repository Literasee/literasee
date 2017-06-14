import React, { Component } from 'react'
import User from './index'
import HeroCarousel from './HeroCarousel'

class UserContainer extends Component {
  componentDidMount() {
    const { params, username, fetchProjects } = this.props
    fetchProjects(params.username || username)
  }

  render() {
    return (
      <main role="main">
        <HeroCarousel
          username={this.props.username}
          oauthUrl={this.props.oauthUrl}
        />
        <User {...this.props} />
      </main>
    )
  }
}

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProjects } from '../../../../actions'

const mapStateToProps = state => {
  return {
    user: state.user,
    username: state.username,
    projects: state.projects,
    oauthUrl: state.oauthUrl,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchProjects,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
