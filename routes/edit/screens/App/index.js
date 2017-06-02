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
    const { params, createFile, createRepo, redirectToRepo } = this.props
    let projectName;

    createRepo()
      .then(({result}) => {
        projectName = result.name;
        return createFile(params, projectName, 'index.idl', templates['index.idl'].content)
      })
      .then(({result}) => {
        redirectToRepo(params.username, projectName)
      });

  }

  render () {
    const wrapperClass = this.props.path.split('/').filter(f => f.length).length > 1 ? ' blue-bg' : '';

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
  createFile,
  fetchUser,
  createRepo
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
    createFile,
    fetchUser,
    createRepo,
    redirectToUserHome: (username) => (dispatch) => {
      dispatch(routeActions.push('/' + username))
    },
    redirectToRepo: (username, id) => (dispatch) => {
      dispatch(routeActions.push('/' + username + '/' + id))
    }
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
