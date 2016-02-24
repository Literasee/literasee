import React, { Component } from 'react';
import { getProjectViewUrl } from 'utils/urlUtil';

import styles from './ProjectPreview.styl';

class ProjectPreview extends Component {

  constructor () {
    super();
    this.state = {type: 'report'};
  }

  // when presentations change slides we get a message from the iframe
  // and save the exact URL being displayed
  componentDidMount () {
    window.addEventListener('message', (e) => {
      this.currentHash = e.data;
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.type !== 'keywords') {
      this.setState({type: nextProps.type})
    }
  }

  refresh () {
    this._iframe.src = this.currentHash || this._iframe.src;
    // iframes don't refresh on hash changes so we have to explicitly reload
    document.getElementById('viewerFrame').contentWindow.postMessage('reload', '*');
  }

  render () {
    this.currentHash = null;

    const viewUrl = getProjectViewUrl(this.props, this.state.type, '?embedded=true');

    return (
      <div className={styles.container}>
        <div className={styles.iframeWrapper}>
          <iframe
            id='viewerFrame'
            ref={(c) => this._iframe = c}
            src={viewUrl}>
          </iframe>
        </div>
      </div>
    )
  }
}

export default ProjectPreview;
