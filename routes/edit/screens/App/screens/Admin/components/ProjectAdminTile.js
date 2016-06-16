import React, { Component } from 'react';

import styles from './ProjectAdminTile.styl';
import classNames from 'classnames';

const ProjectAdminTile = ({project, onClick}) => {
  let title = project.name; // only repos have a name field
  title = title || (project.description || '').split('|')[0].trim();
  title = title || project.id;
  const subTitle = (project.description || '').split('|')[1];
  const desc = subTitle ? <p>{subTitle}</p> : null;
  const classes = classNames(styles.adminPanel, {
    [styles.ignoredPanel]: project.isIgnored
  })

  return (
    <div className={classes} onClick={onClick}>
      <h4>{title || project.project}</h4>
      {desc}
    </div>
  )
}

export default ProjectAdminTile;
