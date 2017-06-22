import React, { Component } from 'react'
import _ from 'lodash'
import FileEditor from './FileEditor'
import Toolbar from './Toolbar'
import ProjectPreview from './ProjectPreview'

import styles from './ProjectEditor.styl'

class ProjectEditor extends Component {
  render() {
    const { params, project, code, onCodeChanged, onCancelChanges, onSaveChanges } = this.props

    const mode = params.mode || 'edit'

    return (
      <div className={styles.container}>
        <nav role="navigation" className={styles.nav}>
          <div className={styles.buttonContainer}>
            <button onClick={onCancelChanges} type="button" name="button" className="btn">
              Cancel
            </button>
            <button onClick={onSaveChanges} type="button" name="button" className="btn btn-primary">
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
            code={code}
          />
          <ProjectPreview etag={project.etag} mode={mode} params={params} />
        </div>
      </div>
    )
  }
}

export default ProjectEditor
