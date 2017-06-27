import React, { Component } from 'react'
import _ from 'lodash'
import CodeEditor from './CodeEditor'
import Toolbar from './Toolbar'
import ProjectPreview from './ProjectPreview'

import styles from './ProjectEditor.styl'

class ProjectEditor extends Component {
  render() {
    const { params, project, code, onCodeChanged, onCancelChanges, onSaveChanges } = this.props
    const mode = params.mode || 'edit'

    return (
      <div className={styles.container}>
        <Toolbar params={params} />
        <div
          style={{
            display: 'flex',
            flex: 1,
          }}
        >
          <div
            style={{
              flex: mode === 'edit' ? 1 : 0,
              backgroundColor: 'white',
              padding: '1rem',
            }}
          >
            <CodeEditor code={code} onCodeChange={onCodeChanged} onSave={onSaveChanges} />
          </div>
          <ProjectPreview etag={project.etag} mode={mode} params={params} />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={onCancelChanges} type="button" name="button" className="btn">
            Cancel
          </button>
          <button onClick={onSaveChanges} type="button" name="button" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    )
  }
}

export default ProjectEditor
