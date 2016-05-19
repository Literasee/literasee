import React from 'react';

import styles from './ProjectMetadata.styl';

const getTitles = (project) => {
  const { description } = project;
  const title = description ? description.split('|')[0].trim() : project.id;
  const subTitle = description ? description.split('|')[1] : '';

  return { title, subTitle };
}

const ProjectMetadata = ({ project }) => {
  const { title, subTitle } = getTitles(project);

  return (
    <div className={styles.container}>
      <button className={styles.backBtn}>
        <img src='/public/img/icon-back.png' /> Back
      </button>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </div>
  );
}

export default ProjectMetadata;
