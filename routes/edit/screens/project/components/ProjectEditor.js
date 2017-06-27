import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import _ from 'lodash'
import FileEditor from './FileEditor'
import Toolbar from './Toolbar'
import ProjectPreview from './ProjectPreview'

import styles from './ProjectEditor.styl'

class ProjectEditor extends Component {
  render() {
    const { params, project, code, onCodeChanged, onCancelChanges, onSaveChanges } = this.props
    const { username, owner, name } = params

    const mode = params.mode || 'edit'
    const linkBase = ['', username, owner, project.name].join('/').replace('//', '/')

    return (
      <div className={styles.container}>
        <nav role="navigation" className={styles.nav}>
          <NavLink
            to={linkBase + '/edit'}
            className={styles.navLink}
            activeClassName={styles.active}
          >
            <img src="/public/img/toolbar/edit.png" />
            Edit
          </NavLink>
          <NavLink
            to={linkBase + '/preview'}
            className={styles.navLink}
            activeClassName={styles.active}
          >
            <img src="/public/img/toolbar/preview.png" />
            Preview
          </NavLink>
          <div className={styles.buttonContainer}>
            <button onClick={onCancelChanges} type="button" name="button" className="btn">
              Cancel
            </button>
            <button onClick={onSaveChanges} type="button" name="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </nav>
        <Toolbar mode={mode} />
        <div
          style={{
            display: 'flex',
            flex: 1,
          }}
        >
          <FileEditor
            mode={mode}
            onCodeChanged={onCodeChanged}
            onCancel={onCancelChanges}
            onSave={onSaveChanges}
            code={code}
          />
          <ProjectPreview etag={project.etag} mode={mode} params={params} />
        </div>
      </div>
    )
  }
}

export default ProjectEditor
