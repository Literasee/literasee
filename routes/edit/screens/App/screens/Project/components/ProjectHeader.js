import React, { Component } from 'react';
import { Link } from 'react-router';
import { getProjectViewUrl } from 'utils/urlUtil';

import styles from './ProjectHeader.styl';

export default (props) => {
  const { owner, projectId, description } = props;
  const [title = projectId, subTitle = ''] = (description || '').split('|');
  const viewUrl = getProjectViewUrl(props);

  return (
    <div className={styles.container}>
      <Link className='mega-octicon octicon-chevron-left mr1'
        title='Back to your projects'
        to={'/' + owner}>
      </Link>
      <h3 className='mb0 mr1'>{title.trim()}</h3>
      <div className={styles.subTitle}>{subTitle.trim()}</div>
      <a
        href={viewUrl}
        target='_blank'
        className={styles.viewerBtn}>
        Open in Viewer
      </a>
    </div>
  )
}
