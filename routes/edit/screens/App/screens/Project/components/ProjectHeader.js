import React, { Component } from 'react';
import { Link } from 'react-router';
import { getProjectViewUrl } from 'utils/urlUtil';

import styles from './ProjectHeader.styl';

export default (props) => {
  const { username, project, description, onClickPublish } = props;
  const title = description && description.split('|')[0] || project.id;
  const subTitle = '' || description && description.split('|')[1];
  const viewUrl = getProjectViewUrl(props);

  return (
    <div className={styles.container}>
      <div className={styles.labelsContainer}>
        <Link className='mega-octicon octicon-chevron-left mr1'
          title='Back to your projects'
          to={'/' + username}>
        </Link>
        <div className={styles.titles}>
          <h3 className='mb0 mr1'>{title}</h3>
          <div className={styles.subTitle}>{subTitle}</div>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <a
          href={viewUrl}
          target='_blank'
          className={styles.headerBtn}>
          Open in Viewer
        </a>
        <button
          className={styles.headerBtn}
          onClick={onClickPublish}>
          Publish
        </button>
      </div>
    </div>
  )
}
