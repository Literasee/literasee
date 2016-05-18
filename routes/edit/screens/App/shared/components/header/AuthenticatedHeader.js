import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';

import styles from './header.styl';

export default function ({ user, username, onCreateProject }) {
  const src = user ? user.avatar_url + '&s=40' : '';

  return (
    <header className={styles.container + ' container-fluid'}>
      <div>
        <button
          type='button'
          name='button'
          className='btn btn-primary'
          onClick={onCreateProject}>
          Create a Project
        </button>
      </div>
      <div><a href='/'><Logo scale='0.6' /></a></div>
      <div>
        <nav
          role='navigation'
          className='pure-menu pure-menu-horizontal'>
          <ul className='list-inline list-unstyled cf fl-right'>
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
    </header>
  )
}
