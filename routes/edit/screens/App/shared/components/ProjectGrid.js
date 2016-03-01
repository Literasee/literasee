import React from 'react'
import { Link } from 'react-router'

export default ({projects, username, createGist}) => {
  return (
    <div className='row center-lg'>
      <div className='col-xs-12'>
        <div className='row around-xs mt2'>

          {
            projects
              .filter(p => {
                if (p.name) return true;
                if (p.report) return true;
                if (p.presentation) return true;
                if (p.files['report.md']) return true;
                if (p.files['presentation.md']) return true;

                return false;
              })
              .map(gist => {
                const image = gist.files && gist.files['thumbnail.png'] ?
                  gist.files['thumbnail.png'].raw_url :
                  '/public/img/thumb.svg';

                let title = gist.description ? gist.description.split(' | ').shift() : gist.id || gist._id;
                let description = gist.description ? gist.description.split(' | ').pop() : '';
                let linkDest = username === gist.owner.login ? '' : gist.owner.login + '/';

                return (
                  <div key={gist.id || gist._id} className='col-xs-12 col-md-4 col-lg-4'>
                    <Link className='panel txt-left panel-project scales'
                      style={{backgroundImage: `url("${image}")`}}
                      to={'/' + username + '/' + linkDest + (gist.name || gist.id)}>
                      <h4 className='mb0'>{title}</h4>
                      <p>{description}</p>
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
