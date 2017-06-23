import React from 'react'

import styles from './ProjectPreview.styl'

export default ({ params, mode, etag }) => {
  return (
    <div
      className={styles.container}
      style={{
        flex: mode === 'preview' ? 1 : 0,
      }}
    >
      <div className={styles.previewWrapper}>
        <iframe src={`/preview/${params.username}/${params.project}/?etag=${etag}`} />
      </div>
    </div>
  )
}
