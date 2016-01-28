import React from 'react';
import { Link } from 'react-router';

import styles from './ProjectEditor.styl';

const ProjectEditor = ({ owner, project }) => {
  const path = '/' + owner + '/' + project.id + '/';

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
    </div>
  )
}

export default ProjectEditor;
