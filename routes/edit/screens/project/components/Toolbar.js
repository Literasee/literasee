import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Toolbar.styl'

export default ({ params }) => {
  const { username, owner, project, mode } = params
  const linkBase = ['', username, owner, project].join('/').replace('//', '/')

  return (
    <div className={styles.container}>
      <nav role="navigation" className={styles.nav}>
        <NavLink to={linkBase + '/edit'} className={styles.navLink} activeClassName={styles.active}>
          <img src="/public/img/toolbar/edit.png" />
          Edit
        </NavLink>
        <NavLink
          to={linkBase + '/preview'}
          className={styles.navLink}
          activeClassName={styles.active}
        >
          <img src="/public/img/toolbar/preview.png" />
          Preview
        </NavLink>
      </nav>
      {mode === 'edit' &&
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
        </div>}
      {mode === 'preview' &&
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
          }}
        >
          <a href={`/preview/${username}/${project}`} target="_blank">Open in New Window</a>
        </div>}
    </div>
  )
}
