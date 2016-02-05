import React, { Component } from 'react';

import styles from './ProjectPreview.styl';

class ProjectPreview extends Component {

  // when presentations change slides we get a message from the iframe
  // and save the exact URL being displayed
  componentDidMount () {
    window.addEventListener('message', (e) => {
      this.currentHash = e.data;
    })
  }

  refresh () {
    this._iframe.src = this.currentHash || this._iframe.src;
    // iframes don't refresh on hash changes so we have to explicitly reload
    document.getElementById('viewerFrame').contentWindow.postMessage('reload', '*');
  }

  render () {
    this.currentHash = null;

    const { owner, projectId, type } = this.props;
    const { protocol, hostname, port } = document.location;
    const host = hostname.replace('edit', 'view');

    return (
      <div className={styles.container}>
        <div className={styles.iframeWrapper}>
          <iframe
            id='viewerFrame'
            ref={(c) => this._iframe = c}
            src={`${protocol}//${host}:${port}/${owner}/${projectId}/${type}/`}>
          </iframe>
        </div>
      </div>
    )
  }
}

export default ProjectPreview;
