import React from 'react'
import { Link } from 'react-router'

export default ({projects, username, createGist}) => {
  return (
    <div className='row center-lg'>
      <div className='col-xs-12'>
        <div className='row around-xs mt2'>

          {
            projects
              .map((project) => {
                const image = project.thumbnail || '/public/img/thumb.svg';

                let [ title, subTitle ] = (project.description || '').split('|');
                if (!title) title = project.project;
                let linkDest = project.owner + '/' + project.project;
                if (username && username !== project.owner) {
                  linkDest = username + '/' + linkDest;
                }

                return (
                  <div key={linkDest} className='col-xs-12 col-md-4 col-lg-4'>
                    <Link className='panel txt-left panel-project scales'
                      style={{backgroundImage: `url("${image}")`}}
                      to={'/' + linkDest}>
                      <h4 className='mb0'>{title}</h4>
                      <p>{subTitle}</p>
                    </Link>
                  </div>
                )
              })
          }

        </div>

      </div>

    </div>
  )
}
