import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import FileEditor from './FileEditor';

import styles from './ProjectEditor.styl';

class ProjectEditor extends Component {

  render () {
    const { params, project, onCodeChanged, saveFile } = this.props;
    const { username, owner, project: pId, type } = params;

    const linkBase = ['', username, owner, pId].join('/').replace('//', '/');
    const originalCode = project[type];

    const onCancel = () => {
      onCodeChanged(originalCode);
      this.setState({});
    }

    return (
      <div className={styles.container}>
        <nav role='navigation' className={styles.nav}>
          <Link to={linkBase + '/report'} activeClassName={styles.active}>
            Report
          </Link>
          <Link to={linkBase + '/presentation'} activeClassName={styles.active}>
            Presentation
          </Link>
          <Link to={linkBase + '/keywords'} activeClassName={styles.active}>
            Keywords
          </Link>
        </nav>
        <FileEditor
          onCodeChanged={onCodeChanged}
          onCancel={onCancel}
          onSave={saveFile}
          code={project[type]} />
      </div>
    )
  }

}

export default ProjectEditor;
