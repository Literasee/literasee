import React from 'react';
import Logo from './Logo';

export default function () {
  return (
  <div className='row center-xs'>
    <div className='col-xs-12 col-md-8 mt2 mb2'>
      <h1><Logo /></h1>
      <p className='lead'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <a href={`https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}&scope=gist`} className='btn btn-primary btn-large btn-full-width'>Log in with Github</a>
    </div>
  </div>
  );
}
