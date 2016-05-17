import React from 'react'
import { Link } from 'react-router'

export default ({projects, user, username, createGist}) => {
  return (
    <div className='center-lg container-fluid'>
      <div className='col-xs-12'>
        <div className='row around-xs mt2'>

          {
            projects
              .map((project) => {
                const image = project.thumbnail || '/public/img/thumb.svg';

                let [ title, subTitle ] = (project.description || '').split('|');
                if (!title) title = project.project;
                let linkDest = `/${project.owner}/${project.project}`;
                let linkElement;
                if (username && username !== project.owner) {
                  linkDest = `/${username}${linkDest}`;
                }

                // direct unauthenticated users to the viewer
                if (!user) {
                  linkElement = (
                    <a className='panel txt-left panel-project scales'
                      style={{backgroundImage: `url("${image}")`}}
                      href={linkDest}>
                      <h4 className='mb0'>{title}</h4>
                      <p>{subTitle}</p>
                    </a>
                  );
                } else {
                  linkElement = (
                    <Link className='panel txt-left panel-project scales'
                      style={{backgroundImage: `url("${image}")`}}
                      to={linkDest}>
                      <h4 className='mb0'>{title}</h4>
                      <p>{subTitle}</p>
                    </Link>
                  );
                }

                return (
                  <div key={linkDest} className='col-xs-12 col-md-4 col-lg-4'>
                    {linkElement}
                  </div>
                )
              })
          }

        </div>

      </div>

    </div>
  )
}
