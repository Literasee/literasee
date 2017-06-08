import React, { Component } from 'react';
import { getProjectViewUrl } from 'utils/urlUtil';
import marked from 'marked';

import styles from './ProjectPreview.styl';

class ProjectPreview extends Component {

  render () {

    const { project, params } = this.props;

    if (!project) return <div />;

    const viewUrl = getProjectViewUrl(params) + `?source=${encodeURI(project.source)}`;

    return (
      <div className={styles.container}>
        <div className={styles.previewWrapper}>
          <iframe src={viewUrl}></iframe>
        </div>
      </div>
    )
  }
}

export default ProjectPreview;
