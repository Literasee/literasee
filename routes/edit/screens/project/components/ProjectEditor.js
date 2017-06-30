import React from 'react'
import _ from 'lodash'
import CodeEditor from './CodeEditor'
import Toolbar from './toolbar'
import ProjectPreview from './ProjectPreview'
import ProjectButtons from './ProjectButtons'
import PendingChangesOverlay from './PendingChangesOverlay'

import styles from './ProjectEditor.styl'
let etagPrev

export default ({
  params,
  project,
  code,
  layout,
  theme,
  onCodeChanged,
  onLayoutChanged,
  onThemeChanged,
  onCancelChanges,
  onSaveChanges,
}) => {
  // project.etag changes any time edits are applied, including previews
  // so if the current and previous match we are re-rendering
  // while waiting for changes to be reflected
  const changesPending = project.etag === etagPrev
  etagPrev = project.etag

  const mode = params.mode || 'edit'
  const changesExist =
    code !== project.source || layout !== project.layout || theme !== project.theme

  return (
    <div className={styles.container}>
      <Toolbar
        params={params}
        project={project}
        layout={layout}
        theme={theme}
        onLayoutChanged={onLayoutChanged}
        onThemeChanged={onThemeChanged}
      />
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <CodeEditor
          isActive={mode === 'edit'}
          code={code}
          onCodeChange={onCodeChanged}
          onSave={onSaveChanges}
        />
        <ProjectPreview isActive={mode === 'preview'} etag={project.etag} params={params} />
        {mode === 'preview' && <PendingChangesOverlay isVisible={changesPending} />}
      </div>
      <ProjectButtons
        changesExist={changesExist}
        onCancelChanges={onCancelChanges}
        onSaveChanges={onSaveChanges}
      />
    </div>
  )
}
