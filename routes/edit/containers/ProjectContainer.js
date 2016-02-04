import React, { Component } from 'react';
import Project from '../screens/App/screens/Project';

class ProjectContainer extends Component {
  componentDidMount () {
    const { token, params, fetchProject } = this.props;
    fetchProject(token, params.gistId);
  }

  render () {
    return <Project {...this.props} />;
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchProject,
  saveFile
} from '../actions';

const mapStateToProps = (state) => {
  return {
    routing: state.routing,
    token: state.token,
    project: state.project
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchProject,
    saveFile
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer);
