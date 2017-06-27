import React from 'react'
import _ from 'lodash'
import CodeEditor from './CodeEditor'
import Toolbar from './Toolbar'
import ProjectPreview from './ProjectPreview'
import ProjectButtons from './ProjectButtons'

import styles from './ProjectEditor.styl'

export default ({ params, project, code, onCodeChanged, onCancelChanges, onSaveChanges }) => {
  const mode = params.mode || 'edit'
  let ripple

  return (
    <div className={styles.container}>
      <Toolbar params={params} />
      <div style={{ display: 'flex', flex: 1 }}>
        <CodeEditor
          isActive={mode === 'edit'}
          code={code}
          onCodeChange={onCodeChanged}
          onSave={onSaveChanges}
        />
        <ProjectPreview isActive={mode === 'preview'} etag={project.etag} params={params} />
      </div>
      <ProjectButtons
        changesExist={code !== project.source}
        onCancelChanges={onCancelChanges}
        onSaveChanges={onSaveChanges}
      />
    </div>
  )
}
