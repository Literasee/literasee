import React, { Component } from 'react';

import styles from './Keywords.styl';

class Keywords extends Component {

  render () {
    let { keywords, add, remove} = this.props;
    keywords = keywords || [];

    return (
      <div className={styles.container}>
        <h5>Keywords:</h5>
        {
          keywords
            .filter(keyword => {
              return keyword && keyword.length;
            })
            .map(keyword => {
              return (
                <div
                  className={styles.keyword}
                  key={keyword}>
                  {keyword}
                  <button onClick={remove.bind(null, keyword)}>
                    <img src='/public/img/x.png' />
                  </button>
                </div>
              )
            })
        }
        <div className={styles.input}>
          <input
            ref={(c) => this._input = c}
            type='text'
            placeholder='Add Keyword...'
            onKeyPress={(e) => add(e, this._input)} />
          <img src='/public/img/return.png' />
        </div>
      </div>
    );
  }

}

export default Keywords;
