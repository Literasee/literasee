import React, { Component } from 'react';
import ProjectHeader from './components/ProjectHeader';
import ProjectEditor from './components/ProjectEditor';
import ProjectPreview from './components/ProjectPreview';

import styles from './Project.styl';

class Project extends Component {

  constructor () {
    super();
    this.state = {originalCode: null};
  }

  componentWillReceiveProps (nextProps) {
    const { project, params } = this.props;

    if (this.state && !this.state.originalCode) {
      this.setState({originalCode: project[params.type]});
    }

    if (nextProps.path !== this.props.path) {
      this.setState({originalCode: project[nextProps.params.type]});
    }
  }

  onSaveTitles (title, subTitle) {
    const { params, project, updateProjectDescription } = this.props;
    updateProjectDescription(params, project, title, subTitle);
  }

  onCodeChanged (newCode) {
    const { params, codeChanged } = this.props;
    codeChanged(params.type, newCode || ' ');
  }

  onCancelChanges () {
    if (this.state.originalCode) this.onCodeChanged(this.state.originalCode);
  }

  onSaveChanges () {
    const { params, project, user, saveFile } = this.props;

    saveFile(params, project, user);
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
            onCancelChanges={::this.onCancelChanges}
            onSaveChanges={::this.onSaveChanges} />
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
