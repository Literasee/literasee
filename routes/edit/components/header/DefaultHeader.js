import React from 'react'
import Logo from './Logo'

import styles from './header.styl'

export default function({ oauthUrl }) {
  return (
    <header className={styles.container + ' container-fluid'}>
      <div />
      <div><a href="/"><Logo scale="0.6" /></a></div>
      <div>
        <a href={oauthUrl} className="btn">
          Log in with GitHub
        </a>
      </div>
    </header>
  )
}
