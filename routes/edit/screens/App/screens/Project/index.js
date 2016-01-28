import React, { Component } from 'react';
import ProjectHeader from './components/ProjectHeader';
import ProjectEditor from './components/ProjectEditor';
import ProjectPreview from './components/ProjectPreview';

import styles from './Project.styl';

class Project extends Component {
  render () {
    const { project, params } = this.props;

    return (
      <div className={styles.container}>
        <ProjectHeader owner={params.username} project={project} />
        <div className={styles.contentArea}>
          <ProjectEditor owner={params.username} project={project} />
          <ProjectPreview
            owner={params.username}
            projectId={params.gistId}
            type={params.type} />
        </div>
      </div>
    )
  }
}

export default Project;
