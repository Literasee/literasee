import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProject } from '../actions';
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

const mapStateToProps = (state) => {
  return {
    token: state.token,
    project: state.project
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchProject
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectContainer);
