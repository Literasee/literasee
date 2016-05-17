import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';

import styles from './header.styl';

export default function ({ user, username, onCreateProject }) {
  const src = user ? user.avatar_url + '&s=40' : '';
  const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}&scope=gist,repo`;

  return (
    <header className={styles.container + ' container-fluid'}>
      <div></div>
      <div><a href='/'><Logo scale='0.6' /></a></div>
      <div>
        <a
          href={oauthUrl}
          className='btn'>
          Log in with Github
        </a>
      </div>
    </header>
  )
}
