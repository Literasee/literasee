import React, { Component } from 'react';
import { routeActions } from 'react-router-redux';

import Header from './shared/components/header';
import Footer from './shared/components/footer';
import templates from './shared/templates';

class App extends Component {
  componentDidMount () {
    const { username, path, fetchUser, redirectToUserHome } = this.props;
    fetchUser();
    if (path.length < 2 && username) redirectToUserHome(username);
  }

  onCreateProject () {
    const { params, createGist, redirectToGist } = this.props

    createGist(templates)
      .then(({result}) => {
        redirectToGist(params.username, result.id)
      })
  }

  render () {
    return (
      <div className='wrapper'>
        <Header {...this.props} onCreateProject={::this.onCreateProject} />
        <main role='main' className='section-dimmed container-fluid'>
          {this.props.children}
        </main>
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
    path: state.routing.location.pathname
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
