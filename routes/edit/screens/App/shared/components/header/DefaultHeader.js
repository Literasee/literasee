import React from 'react';
import Logo from './Logo';

export default function () {
  return (
  <div className='row center-xs'>
    <div className='col-xs-12 col-md-8 mt2 mb2'>
      <h1><Logo /></h1>
      <p className='lead'>
       Create | Collaborate | Communicate
      </p>
      <a href={`https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}&scope=gist`} className='btn btn-primary btn-large btn-full-width'>Log in with Github</a>
    </div>
  </div>
  );
}
