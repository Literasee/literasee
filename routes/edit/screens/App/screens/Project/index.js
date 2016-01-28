import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Project.styl';

class Project extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div style={{backgroundColor: 'pink'}}>HEADER</div>
        <div style={{width: '100%', display: 'flex', flexGrow: 1}}>
          <div style={{backgroundColor: 'lightgreen', width: '50%'}}>EDIT AREA</div>
          <div style={{backgroundColor: 'lightblue', width: '50%'}}>PREVIEW AREA</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    gist: state.gist
  }
}

export default connect(
  mapStateToProps
)(Project)
