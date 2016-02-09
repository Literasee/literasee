import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './ProjectHeader.styl';

export default (props) => {
  const { owner, projectId, description, type } = props;
  const [title = projectId, subTitle = ''] = (description || '').split('|');
  const { protocol, hostname, port } = document.location;
  const host = hostname.replace('edit', 'view');

  return (
    <div className={styles.container}>
      <Link className='mega-octicon octicon-chevron-left mr1'
        title='Back to your projects'
        to={'/' + owner}>
      </Link>
      <h3 className='mb0 mr1'>{title.trim()}</h3>
      <div className={styles.subTitle}>{subTitle.trim()}</div>
      <a
        href={`${protocol}//${host}:${port}/${owner}/${projectId}/${type}/`}
        target='_blank'
        className={styles.viewerBtn}>
        Open in Viewer
      </a>
    </div>
  )
}
