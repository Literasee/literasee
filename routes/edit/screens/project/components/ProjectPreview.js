import React from 'react'
import { getProjectViewUrl } from 'utils/urlUtil'

import styles from './ProjectPreview.styl'

export default ({ project, params, mode }) => {
  if (!project || !project.source) return <div />

  return (
    <div
      className={styles.container}
      style={{
        flex: mode === 'preview' ? 1 : 0,
      }}
    >
      <div className={styles.previewWrapper}>
        <iframe src={`${getProjectViewUrl(params)}?source=${encodeURI(project.source)}`} />
      </div>
    </div>
  )
}
