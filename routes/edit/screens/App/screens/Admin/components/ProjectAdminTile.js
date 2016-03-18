import React, { Component } from 'react';

const ProjectAdminTile = (project) => {
  let title = project.name; // only repos have a name field
  title = title || (project.description || '').split('|')[0].trim();
  title = title || project.id;
  const subTitle = (project.description || '').split('|')[1];
  const image = project.files && project.files['thumbnail.png'] ?
    project.files['thumbnail.png'].raw_url :
    '/public/img/thumb.png';

  return (
    <div key={project.id} className='col-lg-12'>
      <div
        className='panel txt-left panel-project'
        style={{backgroundImage: `url("${image}")`}}>
        <h4 className='mb0'>{title}</h4>
        <p>{subTitle}</p>
      </div>
    </div>
  )
}

export default ProjectAdminTile;
