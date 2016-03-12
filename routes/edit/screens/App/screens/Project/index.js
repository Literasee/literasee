import React, { Component } from 'react';
import ProjectHeader from './components/ProjectHeader';
import ProjectEditor from './components/ProjectEditor';
import ProjectPreview from './components/ProjectPreview';

import styles from './Project.styl';

class Project extends Component {
  saveFile () {
    const { params, project, saveFile } = this.props;

    saveFile(params, project);
      // .then(::this._preview.refresh);
  }

  onSaveTitles (title, subTitle) {
    const { project, updateProjectDescription } = this.props;
    updateProjectDescription({...project, description: title + '|' + subTitle});
  }

  onCodeChanged (newCode) {
    this._preview.updatePreview(newCode);
  }

  render () {
    const { project, params, publishProject } = this.props;

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
