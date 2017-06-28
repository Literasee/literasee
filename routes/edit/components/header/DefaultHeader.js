import React from 'react'
import Logo from './Logo'

import styles from './header.styl'

export default function() {
  return (
    <header className={styles.container + ' container-fluid'}>
      <div />
      <div><a href="/"><Logo scale="0.6" /></a></div>
      <div>
        <a href={OAUTH_URL} className="btn">
          Log in with GitHub
        </a>
      </div>
    </header>
  )
}
