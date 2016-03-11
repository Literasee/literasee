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

    const onClickPublish = () => publishProject(project);

    return (
      <div className={styles.container}>
        <ProjectHeader
          username={params.username}
          project={project}
          type={params.type}
          onSaveTitles={::this.onSaveTitles}
          onClickPublish={onClickPublish} />
        <div className={styles.contentArea}>
          <ProjectEditor
            params={params}
            project={project}
            onCodeChanged={::this.onCodeChanged}
            saveFile={::this.saveFile} />
          <ProjectPreview
            params={params}
            ref={(c) => this._preview = c}
            project={project}
            type={params.type} />
        </div>
      </div>
    )
  }
}

export default Project;
