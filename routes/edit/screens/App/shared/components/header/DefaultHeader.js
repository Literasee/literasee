import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';

import styles from './header.styl';

export default function ({ user, username, onCreateProject }) {
  const src = user ? user.avatar_url + '&s=40' : '';
  const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}&scope=gist,repo`;

  return (
    <div className={styles.container}>
      <a href='/'><Logo scale='0.6' /></a>
      <p>Create • Collaborate • Communicate</p>
      <a
        href={oauthUrl}
        className='btn btn-primary'>
        Log in with Github
      </a>
    </div>
  )
}
