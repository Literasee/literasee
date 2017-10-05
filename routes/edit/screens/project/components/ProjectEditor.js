import React from 'react'
import _ from 'lodash'
import CodeEditor from './CodeEditor'
import Toolbar from './toolbar'
import ProjectPreview from './ProjectPreview'
import ProjectButtons from './ProjectButtons'

import styles from './ProjectEditor.styl'

export default ({
  params,
  project,
  code,
  layout,
  theme,
  isPreviewCurrent,
  onCodeChanged,
  onLayoutChanged,
  onThemeChanged,
  onCancelChanges,
  onSaveChanges,
}) => {
  const mode = params.mode || 'edit'
  const changesExist =
    code !== project.source ||
    layout !== project.layout ||
    theme !== project.theme

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
        <ProjectPreview
          code={code}
          isActive={mode === 'preview'}
          params={params}
        />
      </div>
      <ProjectButtons
        changesExist={changesExist}
        onCancelChanges={onCancelChanges}
        onSaveChanges={onSaveChanges}
      />
    </div>
  )
}
