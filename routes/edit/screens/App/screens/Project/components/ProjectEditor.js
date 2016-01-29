import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import ReportEditor from './ReportEditor';

import styles from './ProjectEditor.styl';

const ProjectEditor = ({ owner, project, type }) => {
  const path = '/' + owner + '/' + project.id + '/';
  let editor;

  if (type === 'report') {
    editor = <ReportEditor file={_.find(project.files, {filename: 'report.md'})} />;
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
      {editor}
    </div>
  )
}

export default ProjectEditor;
