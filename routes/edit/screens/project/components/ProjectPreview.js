import React from 'react'

import styles from './ProjectPreview.styl'

export default ({ params, isActive, etag }) => {
  return (
    <div className={styles.container} style={{ flex: isActive ? 1 : 0 }}>
      <div className={styles.previewWrapper}>
        <iframe src={`/preview/${params.username}/${params.project}/?etag=${etag}`} />
      </div>
    </div>
  )
}
