import React, { Component } from 'react';
import User from './index';

class UserContainer extends Component {
  componentDidMount () {
    const { params, username, fetchProjects } = this.props;
    fetchProjects(params.username || username);
  }

  render () {
    return <User {...this.props} />;
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchProjects
} from '../../../../actions';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    username: state.username,
    projects: state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchProjects
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
