import React, { Component } from 'react'
import _ from 'lodash'
import FileEditor from './FileEditor'
import Toolbar from './Toolbar'
import ProjectPreview from './ProjectPreview'

import styles from './ProjectEditor.styl'

class ProjectEditor extends Component {
  render() {
    const {
      params,
      project,
      onCodeChanged,
      onCancelChanges,
      onSaveChanges,
    } = this.props

    const mode = params.mode || 'edit'

    return (
      <div className={styles.container}>
        <nav role="navigation" className={styles.nav}>
          <div className={styles.buttonContainer}>
            <button
              onClick={onSaveChanges.bind(null, true)}
              type="button"
              name="button"
              className="btn"
            >
              Save &amp; Open
            </button>
            <button
              onClick={onSaveChanges}
              type="button"
              name="button"
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </nav>
        <Toolbar />
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
            code={project.source}
          />
          <ProjectPreview mode={mode} project={project} params={params} />
        </div>
      </div>
    )
  }
}

export default ProjectEditor
