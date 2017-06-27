import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Toolbar.styl'

export default ({ mode }) => {
  if (mode === 'preview') {
    return <div className={styles.container} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.tools}>
        <div className={styles.buttonGroup}>
          <button><img src="/public/img/toolbar/headings.png" /></button>
          <button><img src="/public/img/toolbar/B.png" /></button>
          <button><img src="/public/img/toolbar/i.png" /></button>
        </div>
        <div className={styles.buttonGroup}>
          <button><img src="/public/img/toolbar/quote.png" /></button>
          <button><img src="/public/img/toolbar/code.png" /></button>
          <button><img src="/public/img/toolbar/link.png" /></button>
        </div>
        <div className={styles.buttonGroup}>
          <button><img src="/public/img/toolbar/list1.png" /></button>
          <button><img src="/public/img/toolbar/list2.png" /></button>
        </div>
      </div>
    </div>
  )
}
