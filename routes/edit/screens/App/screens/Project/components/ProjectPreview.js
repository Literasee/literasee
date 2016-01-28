import React from 'react';

import styles from './ProjectPreview.styl';

const ProjectPreview = ({ path, type = 'report' }) => {
  return (
    <div className={styles.container}>
      <div className={styles.iframeWrapper}>
        <iframe
          id='viewerFrame'
          src={`http://view.literasee.io${path}/${type}`}>
        </iframe>
      </div>
    </div>
  )
}

export default ProjectPreview;
