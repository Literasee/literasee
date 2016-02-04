import React, { Component } from 'react';

import styles from './ProjectPreview.styl';

class ProjectPreview extends Component {

  refresh () {
    this._iframe.src = this._iframe.src;
  }

  render () {
    const { owner, projectId, type } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.iframeWrapper}>
          <iframe
            id='viewerFrame'
            ref={(c) => this._iframe = c}
            src={`http://view.literasee.io/${owner}/${projectId}/${type}`}>
          </iframe>
        </div>
      </div>
    )
  }
}

export default ProjectPreview;
