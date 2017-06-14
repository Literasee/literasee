import React, { Component } from 'react'

import styles from './Carousel.styl'

export default ({ swapHero, oauthUrl, style }) =>
  <div className={styles.containerB} style={style}>
    <div className={styles.nav}>
      <a
        onClick={swapHero}
        style={{ background: 'rgba(100, 100, 100, 0.8)' }}
      />
      <a style={{ background: '#FFFFFF' }} className={styles.disabled} />
    </div>

    <div className={styles.content}>
      <div className={styles.copy}>
        <h2>Working with Literasee is simple. Really simple.</h2>
        <p>
          Collaborate on the development of such content by using GitHub as
          a backend allowing for distributed content creation as well as the
          "forking" of work one wants to build upon
        </p>
        <div className={styles.cta}>
          <a href={oauthUrl} className="btn btn-primary btn-large">
            Connect and Create!
          </a>
        </div>
      </div>
      <div className={styles.preview}>
        <img width="776" height="487" src="/public/img/editor-preview.png" />
      </div>
    </div>
  </div>
