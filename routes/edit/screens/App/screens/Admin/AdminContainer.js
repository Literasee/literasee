import React, { Component } from 'react';
import Admin from './index';

class AdminContainer extends Component {
  componentDidMount () {
    this.props.fetchProjects();
  }

  render () {
    return <Admin {...this.props} />;
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
)(AdminContainer);
