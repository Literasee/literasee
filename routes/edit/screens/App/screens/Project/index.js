import React, { Component } from 'react';
import ProjectMetadata from './components/ProjectMetadata';
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
    const { params, project, saveFile } = this.props;

    saveFile(params, project);
  }

  render () {
    const { project, params } = this.props;

    return (
      <div className={styles.container}>
        <ProjectMetadata {...this.props} />
        <ProjectEditor
          params={params}
          project={project}
          onCodeChanged={::this.onCodeChanged}
          onCancelChanges={::this.onCancelChanges}
          onSaveChanges={::this.onSaveChanges} />
      </div>
    )
  }
}

export default Project;
