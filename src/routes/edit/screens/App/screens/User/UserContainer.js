import React, { Component } from 'react';
import User from './index';

class UserContainer extends Component {
  componentDidMount () {
    const { params, fetchProjects } = this.props;
    fetchProjects(params);
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
