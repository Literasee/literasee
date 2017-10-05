import React from 'react'
import compile from 'idyll-compiler'
import * as components from 'idyll-components'
import IdyllDocument from 'idyll-document'
import styles from './ProjectPreview.styl'

export default ({ params, isActive, code }) => {
  const { owner, username, project } = params
  let ast, display

  try {
    ast = compile(code)
    display = <IdyllDocument key={code} ast={ast} components={components} />
  } catch (e) {
    return <pre>{e.message}</pre>
  }

  return (
    <div className={styles.container} style={{ flex: isActive ? 1 : 0 }}>
      <div className={styles.previewWrapper}>{display}</div>
    </div>
  )
}
