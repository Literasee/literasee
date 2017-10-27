import React from 'react'

import styles from './EditTools.styl'

export default ({ onButtonClick }) => (
  <div className={styles.tools}>
    <div className={styles.buttonGroup}>
      {/*<button>
        <img src="/public/img/toolbar/headings.png" />
      </button>*/}
      <button onClick={onButtonClick.bind(null, 'b')}>
        <img src="/public/img/toolbar/B.png" />
      </button>
      <button onClick={onButtonClick.bind(null, 'i')}>
        <img src="/public/img/toolbar/i.png" />
      </button>
    </div>
    <div className={styles.buttonGroup}>
      <button onClick={onButtonClick.bind(null, 'q')}>
        <img src="/public/img/toolbar/quote.png" />
      </button>
      <button onClick={onButtonClick.bind(null, 'c')}>
        <img src="/public/img/toolbar/code.png" />
      </button>
      <button onClick={onButtonClick.bind(null, 'k')}>
        <img src="/public/img/toolbar/link.png" />
      </button>
    </div>
    <div className={styles.buttonGroup}>
      <button onClick={onButtonClick.bind(null, 'u')}>
        <img src="/public/img/toolbar/list1.png" />
      </button>
      <button onClick={onButtonClick.bind(null, 'o')}>
        <img src="/public/img/toolbar/list2.png" />
      </button>
    </div>
  </div>
)
