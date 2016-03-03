import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import FileEditor from './FileEditor';
import ReportOptionsPanel from './ReportOptionsPanel';

import styles from './ProjectEditor.styl';

class ProjectEditor extends Component {

  render () {
    const { username, project, type } = this.props;

    const projectFragment = project.owner && username === project.owner.login ? project.id : project.full_name;
    const linkBase = '/' + [username, projectFragment].join('/') + '/';
    const ext = type === 'keywords' ? '.txt' : '.md';
    const file = _.find(project.files, {filename: type + ext});
    const originalCode = file && file.content;
    const optionsPanel = type === 'report' ? <ReportOptionsPanel /> : null;

    const onCodeChange = (newCode) => {
      file.content = newCode;
      this.props.onCodeChanged(newCode);
    }

    const onCancel = () => {
      onCodeChange(originalCode);
      this.setState({});
    }

    const onSave = () => {
      this.props.saveFileType(this.props.type);
    }

    return (
      <div className={styles.container}>
        <nav role='navigation' className={styles.nav}>
          <Link to={linkBase + 'report'} activeClassName={styles.active}>
            Report
          </Link>
          <Link to={linkBase + 'presentation'} activeClassName={styles.active}>
            Presentation
          </Link>
          <Link to={linkBase + 'keywords'} activeClassName={styles.active}>
            Keywords
          </Link>
        </nav>
        <FileEditor
          onCodeChange={onCodeChange}
          onCancel={onCancel}
          onSave={onSave}
          file={file}>
          {optionsPanel}
        </FileEditor>
      </div>
    )
  }

}

export default ProjectEditor;
