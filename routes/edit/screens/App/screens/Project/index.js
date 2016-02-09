import React, { Component } from 'react';
import ProjectHeader from './components/ProjectHeader';
import ProjectEditor from './components/ProjectEditor';
import ProjectPreview from './components/ProjectPreview';

import styles from './Project.styl';

class Project extends Component {
  saveFileType (type) {
    const { project, saveFile } = this.props;
    const file = _.find(project.files, {filename: type + '.md'});

    saveFile(project.id, file)
      .then(::this._preview.refresh);
  }

  render () {
    const { project, params } = this.props;

    return (
      <div className={styles.container}>
        <ProjectHeader
          owner={params.username}
          projectId={params.gistId}
          description={project.description}
          type={params.type} />
        <div className={styles.contentArea}>
          <ProjectEditor
            owner={params.username}
            project={project}
            type={params.type}
            saveFileType={::this.saveFileType} />
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
