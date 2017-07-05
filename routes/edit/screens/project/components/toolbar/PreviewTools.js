import React from 'react'

import styles from './PreviewTools.styl'

export default ({ href, layout, theme, onLayoutChanged, onThemeChanged }) =>
  <div className={styles.container}>
    <div>
      Layout:
      <select value={layout} onChange={onLayoutChanged}>
        <option value="blog">Blog</option>
        <option value="centered">Centered</option>
      </select>
    </div>
    <div>
      Theme:
      <select value={theme} onChange={onThemeChanged}>
        <option value="idyll">Idyll</option>
        <option value="github">GitHub</option>
      </select>
    </div>
    <a href={href} target="_blank">
      Open in New Window
    </a>
  </div>