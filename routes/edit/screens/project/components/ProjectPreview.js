import React from 'react'
import compile from 'idyll-compiler'
import * as components from 'idyll-components'
import IdyllDocument from 'idyll-document'
import styles from './ProjectPreview.styl'

import LiteraseeComponents from './literasee-components'

export default ({ code }) => (
  <div className={styles.container}>
    <div className={styles.previewWrapper + ' doc-wrapper'}>
      <IdyllDocument
        key={code}
        ast={compile(code)}
        components={{
          ...components,
          ...LiteraseeComponents,
        }}
      />
    </div>
  </div>
)
