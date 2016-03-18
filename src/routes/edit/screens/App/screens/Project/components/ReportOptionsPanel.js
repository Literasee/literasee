import React, { Component } from 'react';

import styles from './ReportOptionsPanel.styl';

class ReportOptionsPanel extends Component {
  constructor () {
    super();

    this.state = {
      style: 'basic'
    };
  }

  onStyleChanged (e) {
    this.setState({style: e.target.value});
  }

  render () {
    return (
      <div className={styles.container}>
        <h4>Style</h4>

        <input id='basicStyle' type='radio' name='reportStyle' value='basic'
          checked={this.state.style === 'basic'}
          onChange={::this.onStyleChanged} />
        <label htmlFor='basicStyle'>Basic</label>

        <input id='tufteStyle' type='radio' name='reportStyle' value='tufte'
          checked={this.state.style === 'tufte'}
          onChange={::this.onStyleChanged} />
        <label htmlFor='tufteStyle'>Tufte</label>
      </div>
    )
  }
}

export default ReportOptionsPanel;
