import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import FileEditor from './FileEditor';
import Toolbar from './Toolbar';
import ProjectPreview from './ProjectPreview';

import styles from './ProjectEditor.styl';

class ProjectEditor extends Component {

  render () {
    const {
      params,
      project,
      onCodeChanged,
      onCancelChanges,
      onSaveChanges
    } = this.props;
    const { username, owner, project: pId, type } = params;
    const mode = params.mode || 'edit';

    const linkBase = ['', username, owner, pId].join('/').replace('//', '/');

    const contentView = mode === 'preview'
      ? <ProjectPreview project={project} params={params} />
      : <FileEditor
          onCodeChanged={onCodeChanged}
          onCancel={onCancelChanges}
          onSave={onSaveChanges}
          code={project[type]} />;

    return (
      <div className={styles.container}>
        <nav role='navigation' className={styles.nav}>
          <Link
            to={linkBase + '/report/' + mode}
            className={styles.navLink}
            activeClassName={styles.active}>
            <img src='/public/img/icon-report.svg' />
            Report
          </Link>
          <Link
            to={linkBase + '/presentation/' + mode}
            className={styles.navLink}
            activeClassName={styles.active}>
            <img src='/public/img/icon-presentation.svg' />
            Presentation
          </Link>
          <div className={styles.buttonContainer}>
            <button
              onClick={onSaveChanges.bind(null, true)}
              type='button'
              name='button'
              className='btn'>
              Save &amp; Open
            </button>
            <button
              onClick={onSaveChanges}
              type='button'
              name='button'
              className='btn btn-primary'>
              Save
            </button>
          </div>
        </nav>
        <Toolbar />
        {contentView}
      </div>
    )
  }
}

export default ProjectEditor;
