import React from 'react';
import { Link } from 'react-router';

import styles from './ProjectMetadata.styl';

const getTitles = (project) => {
  const { description } = project;
  const title = description ? description.split('|')[0].trim() : project.id;
  const subTitle = description ? description.split('|')[1] : '';

  return { title, subTitle };
}

const ProjectMetadata = ({ project, params }) => {
  const { title, subTitle } = getTitles(project);

  return (
    <div className={styles.container}>
      <Link
        to={'/' + params.username}
        className={styles.backBtn}>
        <img src='/public/img/icon-back.png' /> Back
      </Link>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </div>
  );
}

export default ProjectMetadata;
