import React, { Component } from 'react';
import Project from './index';

class ProjectContainer extends Component {
  componentDidMount () {
    const { params, fetchProject } = this.props;
    fetchProject(params);
  }

  render () {
    return <Project {...this.props} />;
  }
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchProject,
  codeChanged,
  saveFile,
  updateProjectDescription
} from '../../../../actions';

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
    codeChanged,
    saveFile,
    updateProjectDescription
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer);
