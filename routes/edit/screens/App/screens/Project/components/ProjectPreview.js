import React from 'react';

import styles from './ProjectPreview.styl';

const ProjectPreview = ({ owner, projectId, type }) => {
  return (
    <div className={styles.container}>
      <div className={styles.iframeWrapper}>
        <iframe
          id='viewerFrame'
          src={`http://view.literasee.io/${owner}/${projectId}/${type}`}>
        </iframe>
      </div>
    </div>
  )
}

export default ProjectPreview;
