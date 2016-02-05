import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import ReportEditor from './ReportEditor';

import styles from './ProjectEditor.styl';

class ProjectEditor extends Component {

  render () {
    const { owner, project, type, saveFile } = this.props;

    const path = '/' + owner + '/' + project.id + '/';
    const file = _.find(project.files, {filename: type + '.md'});
    const originalCode = file && file.content;

    const onCodeChange = (newCode) => {
      file.content = newCode;
    }

    const onSave = () => {
      saveFile(file)
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
        <ReportEditor
          onCodeChange={onCodeChange}
          onSave={onSave}
          file={file} />
      </div>
    )
  }

}

export default ProjectEditor;
