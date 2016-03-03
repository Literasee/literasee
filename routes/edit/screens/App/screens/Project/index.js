import React, { Component } from 'react';
import ProjectHeader from './components/ProjectHeader';
import ProjectEditor from './components/ProjectEditor';
import ProjectPreview from './components/ProjectPreview';

import styles from './Project.styl';

class Project extends Component {
  saveFileType (type) {
    const { params, project, saveFile } = this.props;
    const ext = type === 'keywords' ? '.txt' : '.md';
    const file = _.find(project.files, {filename: type + ext});

    saveFile(params.username, project, file)
      .then(::this._preview.refresh);
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
            username={params.username}
            project={project}
            type={params.type}
            onCodeChanged={::this.onCodeChanged}
            saveFileType={::this.saveFileType} />
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
