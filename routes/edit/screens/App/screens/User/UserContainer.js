import React, { Component } from 'react';
import { routeActions } from 'react-router-redux';
import User from './index';
import templates from './templates';

class UserContainer extends Component {
  componentDidMount () {
    const { fetchProjects, fetchUser } = this.props;

    fetchProjects().then(fetchUser);
  }

  onCreateProject () {
    const { params, createGist, redirectToGist } = this.props

    createGist(templates)
      .then(({result}) => {
        redirectToGist(params.username, result.id)
      })
  }

  render () {
    return <User {...this.props} onCreateProject={::this.onCreateProject} />;
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchProjects,
  fetchUser,
  createGist
} from '../../../../actions';

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchProjects,
    fetchUser,
    createGist,
    redirectToGist: (username, id) => {
      dispatch(routeActions.push('/' + username + '/' + id))
    }
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
