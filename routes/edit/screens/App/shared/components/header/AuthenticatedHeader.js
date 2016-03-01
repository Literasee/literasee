import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';

import styles from './header.styl';

export default function ({ user, username, onCreateProject }) {
  const src = user ? user.avatar_url + '&s=40' : '';

  return (
    <div className={styles.container}>
      <a href='/'><Logo scale='0.6' /></a>
      <nav
        role='navigation'
        className='pure-menu pure-menu-horizontal'>
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
              <img src={src} width='40' height='40' />
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
