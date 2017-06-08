import React from 'react';
import { getProjectViewUrl } from 'utils/urlUtil';

import styles from './ProjectPreview.styl';

export default ({ project, params }) => {
  if (!project) return <div />;

  return (
    <div className={styles.container}>
      <div className={styles.previewWrapper}>
        <iframe
          src={`${getProjectViewUrl(params)}?source=${encodeURI(project.source)}`}>
        </iframe>
      </div>
    </div>
  )
}
