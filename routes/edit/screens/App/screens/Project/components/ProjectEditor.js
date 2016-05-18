import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import FileEditor from './FileEditor';
import Toolbar from './Toolbar';

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

    const linkBase = ['', username, owner, pId].join('/').replace('//', '/');

    return (
      <div className={styles.container}>
        <nav role='navigation' className={styles.nav}>
          <Link
            to={linkBase + '/report'}
            className='btn btn-large'
            activeClassName={styles.active}>
            Report
          </Link>
          <Link
            to={linkBase + '/presentation'}
            className='btn btn-large'
            activeClassName={styles.active}>
            Presentation
          </Link>
          <div className={styles.buttonContainer}>
            <button
              type='button'
              name='button'
              className='btn'>
              Save &amp; Open
            </button>
            <button
              type='button'
              name='button'
              className='btn btn-primary'>
              Save
            </button>
          </div>
        </nav>
        <Toolbar />
        <FileEditor
          onCodeChanged={onCodeChanged}
          onCancel={onCancelChanges}
          onSave={onSaveChanges}
          code={project[type]} />
      </div>
    )
  }

}

export default ProjectEditor;
