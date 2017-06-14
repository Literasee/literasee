import React, { Component } from 'react'

import styles from './Carousel.styl'

export default ({ swapHero, oauthUrl, style }) =>
  <div className={styles.containerA} style={style}>
    <div className={styles.nav}>
      <a style={{ background: '#0097A7' }} className={styles.disabled} />
      <a onClick={swapHero} style={{ background: 'rgba(0, 0, 0, 0.1)' }} />
    </div>

    <div className={styles.icons}>
      <div className={styles.icon}>
        <img width="212" height="166" src="/public/img/icon-create.png" />
        <h2>Create</h2>
        <p>
          Create engaging and compelling web-based content while minimizing
          the hassle of programming tools and environments
        </p>
      </div>
      <div className={styles.icon}>
        <img width="212" height="166" src="/public/img/icon-collaborate.png" />
        <h2>Collaborate</h2>
        <p>
          Collaborate on the development of such content by using GitHub as
          a backend allowing for distributed content creation as well as the
          "forking" of work one wants to build upon
        </p>
      </div>
      <div className={styles.icon}>
        <img width="212" height="166" src="/public/img/icon-communicate.png" />
        <h2>Communicate</h2>
        <p>
          Communicate the content developed through the web through the use
          of Literasee and social networking
        </p>
      </div>
    </div>

    <div className={styles.cta}>
      <a href={oauthUrl} className="btn btn-primary btn-large">
        Connect and Create!
      </a>
    </div>
  </div>
