import React, { Component } from 'react';
import ProjectHeader from './components/ProjectHeader';
import ProjectPreview from './components/ProjectPreview';

import styles from './Project.styl';

class Project extends Component {
  render () {
    const { project, params } = this.props;

    return (
      <div className={styles.container}>
        <ProjectHeader owner={params.username} project={project} />
        <div className={styles.contentArea}>
          <div style={{backgroundColor: 'lightgreen', width: '100%'}}>EDIT AREA</div>
          <ProjectPreview owner={params.username} projectId={params.gistId} />
        </div>
      </div>
    )
  }
}

export default Project;
