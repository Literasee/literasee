import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './ProjectHeader.styl';

export default ({ project }) => {
  return (
    <div className={styles.container}>
      <Link className='mega-octicon octicon-chevron-left mr1'
        title='Back to your projects'
        to={'/' + project.owner.login}>
      </Link>
      <h3 className='mb0'>{project.id}</h3>
      <div className='description'>{project.description}</div>
    </div>
  )
}
