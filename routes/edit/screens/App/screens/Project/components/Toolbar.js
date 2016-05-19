import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './Toolbar.styl';

class Toolbar extends Component {
  render () {
    let path = '/' + document.location.pathname.split('/')
      .filter((part) => {
        return ['edit', 'preview', ''].indexOf(part) < 0;
      })
      .join('/');

    return (
      <div className={styles.container}>
        <div className={styles.tools}>
          <div className={styles.buttonGroup}>
            <button><img src='/public/img/toolbar/headings.png' /></button>
            <button><img src='/public/img/toolbar/B.png' /></button>
            <button><img src='/public/img/toolbar/i.png' /></button>
          </div>
          <div className={styles.buttonGroup}>
            <button><img src='/public/img/toolbar/quote.png' /></button>
            <button><img src='/public/img/toolbar/code.png' /></button>
            <button><img src='/public/img/toolbar/link.png' /></button>
          </div>
          <div className={styles.buttonGroup}>
            <button><img src='/public/img/toolbar/list1.png' /></button>
            <button><img src='/public/img/toolbar/list2.png' /></button>
          </div>
        </div>
        <div className={styles.modeToggle}>
          <Link
            to={path + '/edit'}
            className={styles.toggleBtn}
            activeClassName={styles.active}>
            <img src='/public/img/toolbar/edit.png' /> Edit
          </Link>
          <Link
            to={path + '/preview'}
            className={styles.toggleBtn}
            activeClassName={styles.active}>
            <img src='/public/img/toolbar/preview.png' /> Preview
          </Link>
        </div>
      </div>
    )
  }
}

export default Toolbar;
