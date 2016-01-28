import React, { Component } from 'react';
import ProjectHeader from './components/ProjectHeader';

import styles from './Project.styl';

class Project extends Component {
  render () {
    const { project, params } = this.props;

    return (
      <div className={styles.container}>
        <ProjectHeader project={project} owner={params.username} />
        <div className={styles.contentArea}>
          <div style={{backgroundColor: 'lightgreen', width: '50%'}}>EDIT AREA</div>
          <div style={{backgroundColor: 'lightblue', width: '50%'}}>PREVIEW AREA</div>
        </div>
      </div>
    )
  }
}

export default Project;
