import React, { Component } from 'react';

import DefaultHeader from './DefaultHeader';
import AuthenticatedHeader from './AuthenticatedHeader';

export default function ({ user, username, onCreateProject, oauthUrl }) {

  if (username) {
    return (
      <AuthenticatedHeader
        user={user}
        username={username}
        onCreateProject={onCreateProject} />
    )
  }

  return <DefaultHeader oauthUrl={oauthUrl} />;

}
