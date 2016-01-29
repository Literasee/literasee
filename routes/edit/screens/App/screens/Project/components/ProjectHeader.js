import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './ProjectHeader.styl';

export default ({ project, owner }) => {
  const [title, subTitle = ''] = (project.description || '').split(' | ');

  return (
    <div className={styles.container}>
      <Link className='mega-octicon octicon-chevron-left mr1'
        title='Back to your projects'
        to={'/' + owner}>
      </Link>
      <h3 className='mb0 mr1'>{title.trim() || project.id}</h3>
      <div className={styles.subTitle}>{subTitle.trim()}</div>
    </div>
  )
}
