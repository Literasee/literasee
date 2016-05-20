import React, { Component } from 'react';
import { routeActions } from 'react-router-redux';

import Header from './shared/components/header';
import Footer from './shared/components/footer';
import templates from './shared/templates';

class App extends Component {
  componentDidMount () {
    const { username, path, fetchUser, redirectToUserHome } = this.props;
    if (username) {
      if (path.length < 2) redirectToUserHome(username);
      fetchUser();
    }
  }

  onCreateProject () {
    const { params, createGist, redirectToGist } = this.props

    createGist(templates)
      .then(({result}) => {
        redirectToGist(params.username, result.id)
      })
  }

  render () {
    const wrapperClass = this.props.path.split('/').filter(f => f.length).length > 2 ? ' blue-bg' : '';

    return (
      <div className={'wrapper' + wrapperClass}>
        <Header {...this.props} onCreateProject={::this.onCreateProject} />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchUser,
  createGist
} from '../../actions';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    username: state.username, // available immediately from cookie
    path: state.routing.location.pathname,
    oauthUrl: state.oauthUrl
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUser,
    createGist,
    redirectToUserHome: (username) => (dispatch) => {
      dispatch(routeActions.push('/' + username))
    },
    redirectToGist: (username, id) => (dispatch) => {
      dispatch(routeActions.push('/' + username + '/' + id))
    }
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
