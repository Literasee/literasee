import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import FileEditor from './FileEditor';
import ReportOptionsPanel from './ReportOptionsPanel';

import styles from './ProjectEditor.styl';

class ProjectEditor extends Component {

  render () {
    const { owner, project, type } = this.props;

    const path = '/' + owner + '/' + project.id + '/';
    const file = _.find(project.files, {filename: type + '.md'});
    const originalCode = file && file.content;
    const optionsPanel = type === 'report' ? <ReportOptionsPanel /> : null;

    const onCodeChange = (newCode) => {
      file.content = newCode;
    }

    const onSave = () => {
      this.props.saveFileType(this.props.type);
    }

    return (
      <div className={styles.container}>
        <nav role='navigation' className={styles.nav}>
          <Link to={path + 'report'} activeClassName={styles.active}>
            Report
          </Link>
          <Link to={path + 'presentation'} activeClassName={styles.active}>
            Presentation
          </Link>
        </nav>
        <FileEditor
          onCodeChange={onCodeChange}
          onSave={onSave}
          file={file}>
          {optionsPanel}
        </FileEditor>
      </div>
    )
  }

}

export default ProjectEditor;
