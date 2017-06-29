import React from 'react'
import { NavLink } from 'react-router-dom'
import EditTools from './EditTools'
import PreviewTools from './PreviewTools'

import styles from './Toolbar.styl'

export default ({ params, project, layout, theme, onLayoutChanged, onThemeChanged }) => {
  const { username, owner, project: projectName, mode } = params
  const linkBase = ['', username, owner, projectName].join('/').replace('//', '/')

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
      {mode === 'edit' && <EditTools />}
      {mode === 'preview' &&
        <PreviewTools
          href={`/preview/${username}/${projectName}`}
          layout={layout}
          theme={theme}
          onLayoutChanged={onLayoutChanged}
          onThemeChanged={onThemeChanged}
        />}
    </div>
  )
}
