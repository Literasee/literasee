import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';

export default function ({ username }) {
  return (
    <div className='row' style={{height: '4rem'}}>
      <h3 className='col-xs-4 col-md-6 txt-left mb0 mt0' style={{margin: 'auto'}}>
        <a href='/'><Logo scale='0.6' /></a>
      </h3>
      <nav
        role='navigation'
        className='col-xs-8 col-md-6'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
        <ul className='list-inline list-unstyled cf fl-right'>
          <li>Welcome <Link to={`/${username}/admin`}>{username}</Link></li>
          <li>
            <a role='button'
              className='btn btn-outlined btn-small'
              href='/logout'>
              Log out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
