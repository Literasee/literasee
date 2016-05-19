import React, { Component } from 'react';

import styles from './Toolbar.styl';

class Toolbar extends Component {
  render () {
    return (
      <div className={styles.container}>
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
    )
  }
}

export default Toolbar;
