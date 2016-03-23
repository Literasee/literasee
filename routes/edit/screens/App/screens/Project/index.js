import React, { Component } from 'react';
import ProjectHeader from './components/ProjectHeader';
import ProjectEditor from './components/ProjectEditor';
import ProjectPreview from './components/ProjectPreview';

import styles from './Project.styl';

class Project extends Component {
  saveFile () {
    const { params, project, user, saveFile } = this.props;

    saveFile(params, project, user);
      // .then(::this._preview.refresh);
  }

  onSaveTitles (title, subTitle) {
    const { params, project, updateProjectDescription } = this.props;
    updateProjectDescription(params, project, title, subTitle);
  }

  onCodeChanged (newCode) {
    const { params, codeChanged } = this.props;
    codeChanged(params.type, newCode);
  }

  render () {
    const { project, params } = this.props;

    return (
      <div className={styles.container}>
        <ProjectHeader
          params={params}
          project={project}
          onSaveTitles={::this.onSaveTitles} />
        <div className={styles.contentArea}>
          <ProjectEditor
            params={params}
            project={project}
            onCodeChanged={::this.onCodeChanged}
            saveFile={::this.saveFile} />
          <ProjectPreview
            params={params}
            project={project}
            ref={(c) => this._preview = c} />
        </div>
      </div>
    )
  }
}

export default Project;
