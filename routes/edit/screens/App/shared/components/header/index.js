import React, { Component } from 'react';

import DefaultHeader from './DefaultHeader';
import AuthenticatedHeader from './AuthenticatedHeader';

export default function ({user, username, onCreateProject}) {

  if (username) {
    return (
      <header className='container-fluid'>
        <AuthenticatedHeader
          user={user}
          username={username}
          onCreateProject={onCreateProject} />
      </header>
    )
  }

  return <DefaultHeader />;

}
