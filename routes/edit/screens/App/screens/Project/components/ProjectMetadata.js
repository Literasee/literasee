import React from 'react';

import styles from './ProjectMetadata.styl';

const ProjectMetadata = ({ project }) => {
  return (
    <div className={styles.container}>
      <h1>{project.description}</h1>
    </div>
  );
}

export default ProjectMetadata;
