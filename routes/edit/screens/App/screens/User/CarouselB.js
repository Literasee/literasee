import React, { Component } from 'react';

import styles from './HeroCarousel.styl'

class CarouselB extends Component {
  render () {
    return (
      <div className={styles.containerB} {...this.props}>
        <div className={styles.nav}>
          <a
            onClick={this.props.swapHero}
            style={{background: 'rgba(100, 100, 100, 0.8)'}}>
          </a>
          <a style={{background: '#FFFFFF'}} className={styles.disabled}></a>
        </div>

        <div className={styles.content}>
          <div className={styles.copy}>
            <h2>Working with Literasee is simple. Really simple.</h2>
            <p>Collaborate on the development of such content by using GitHub as a backend allowing for distributed content creation as well as the "forking" of work one wants to build upon</p>
              <div className={styles.cta}>
                <a
                  href={this.props.oauthUrl}
                  className='btn btn-primary btn-large'>
                  Connect and Create!
                </a>
              </div>
          </div>
          <div className={styles.preview}>
            <img width='776' height='487' src='/public/img/editor-preview.png' />
          </div>
        </div>
      </div>
    )
  }
}

export default CarouselB;
