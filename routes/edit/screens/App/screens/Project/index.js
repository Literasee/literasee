import React, { Component } from 'react';
import ProjectHeader from './components/ProjectHeader';
import ProjectEditor from './components/ProjectEditor';
import ProjectPreview from './components/ProjectPreview';

import styles from './Project.styl';

class Project extends Component {
  saveFile (file) {
    const { project, saveFile } = this.props;

    saveFile(project.id, file)
      .then(::this._preview.refresh);
  }

  render () {
    const { project, params } = this.props;

    return (
      <div className={styles.container}>
        <ProjectHeader owner={params.username} project={project} />
        <div className={styles.contentArea}>
          <ProjectEditor
            owner={params.username}
            project={project}
            type={params.type}
            saveFile={::this.saveFile} />
          <ProjectPreview
            ref={(c) => this._preview = c}
            owner={params.username}
            projectId={params.gistId}
            type={params.type} />
        </div>
      </div>
    )
  }
}

export default Project;
