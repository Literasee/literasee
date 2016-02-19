import React, { Component } from 'react';
import { Link } from 'react-router';
import { getProjectViewUrl } from 'utils/urlUtil';

import styles from './ProjectHeader.styl';

export default (props) => {
  const { owner, projectId, description } = props;
  const title = projectId || description && description.split('|')[0];
  const subTitle = '' || description && description.split('|')[1];
  const viewUrl = getProjectViewUrl(props);

  return (
    <div className={styles.container}>
      <Link className='mega-octicon octicon-chevron-left mr1'
        title='Back to your projects'
        to={'/' + owner}>
      </Link>
      <h3 className='mb0 mr1'>{title}</h3>
      <div className={styles.subTitle}>{subTitle}</div>
      <a
        href={viewUrl}
        target='_blank'
        className={styles.viewerBtn}>
        Open in Viewer
      </a>
    </div>
  )
}
