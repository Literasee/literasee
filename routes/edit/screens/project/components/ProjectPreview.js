import React from 'react'
import compile from 'idyll-compiler'
import * as components from 'idyll-components'
import IdyllDocument from 'idyll-document'
import styles from './ProjectPreview.styl'

export default ({ params, isActive, code }) => {
  const { owner, username, project } = params

  return (
    <div className={styles.container} style={{ flex: isActive ? 1 : 0 }}>
      <div className={styles.previewWrapper}>
        <IdyllDocument key={code} ast={compile(code)} components={components} />
      </div>
    </div>
  )
}
