import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';

import styles from './AuthenticatedHeader.styl';

export default function ({ user, username, onCreateProject }) {
  const src = user ? user.avatar_url + '&s=40' : '';

  return (
    <div className='row' style={{height: '4rem'}}>
      <h3 className='col-xs-4 col-md-6 txt-left mb0 mt0' style={{margin: 'auto'}}>
        <a href='/'><Logo scale='0.6' /></a>
      </h3>
      <nav
        role='navigation'
        className='col-xs-8 col-md-6 pure-menu pure-menu-horizontal'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
        <ul className='list-inline list-unstyled cf fl-right'>
          <li>
            <button
              type='button'
              name='button'
              className='btn btn-primary fl-right'
              onClick={onCreateProject}>
              Create a Project
            </button>
          </li>
          <li className='pure-menu-item pure-menu-has-children pure-menu-allow-hover'>
            <a href='#' className={styles.avatarLink + ' pure-menu-link'}>
              <img src={src} className='ugh' />
            </a>
            <ul className='pure-menu-children'>
              <li className='pure-menu-item'>
                <a href='/logout' className='pure-menu-link'>Log out</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
