import React from 'react'
import { Link } from 'react-router'

export default ({gists, username, createGist}) => {
  return (
    <div className='row center-lg'>
      <div className='col-xs-12'>
        <div className='cf'>
          <h2 className='mt2 txt-left fl-left'>Your Projects</h2>
          <button
            type='button'
            name='button'
            className='btn btn-primary fl-right mt2'
            onClick={createGist}>
            Create a Project
          </button>
        </div>

        <div className='row around-xs'>

          {gists.map(gist => {
            const image = gist.files['thumbnail.png'] ?
              gist.files['thumbnail.png'].raw_url :
              '/public/img/thumb.png';

            let title = gist.description ? gist.description.split(' | ').shift() : gist.id
            let description = gist.description ? gist.description.split(' | ').pop() : ''

            return (
              <div key={gist.id} className='col-xs-12 col-md-4 col-lg-4'>
                <Link className='panel txt-left panel-project scales'
                  style={{backgroundImage: `url("${image}")`}}
                  to={'/' + username + '/' + gist.id}>
                  <h4 className='mb0'>{title}</h4>
                  <p>{description}</p>
                </Link>
              </div>
            )
          })}

        </div>

      </div>

    </div>
  )
}
