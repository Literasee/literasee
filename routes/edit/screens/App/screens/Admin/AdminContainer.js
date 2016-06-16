import React, { Component } from 'react';
import Admin from './index';

class AdminContainer extends Component {
  componentDidMount () {
    const { username, projects, fetchProjects } = this.props;
    fetchProjects(username);
  }

  render () {
    return <Admin {...this.props} />;
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchProjects,
  setProjectIgnoredState
} from '../../../../actions';

const mapStateToProps = (state) => {
  return {
    username: state.username,
    projects: state.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchProjects,
    setProjectIgnoredState
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContainer);
