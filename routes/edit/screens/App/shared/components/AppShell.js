import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';

import Header from './header';
import Footer from './footer';

class AppShell extends Component {
  componentDidMount () {
    const { username, path, redirectToUserHome } = this.props;
    if (path.length < 2 && username) redirectToUserHome(username)
  }

  render () {
    const { username } = this.props;

    return (
      <div className='wrapper'>
        <Header username={username} />
        <main role='main' className='section-dimmed container-fluid'>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    path: state.routing.location.pathname
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    redirectToUserHome: (username) => {
      dispatch(routeActions.replace('/' + username))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppShell);
