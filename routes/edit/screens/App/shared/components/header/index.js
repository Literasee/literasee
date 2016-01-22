import React, { Component } from 'react';

import DefaultHeader from './DefaultHeader';
import AuthenticatedHeader from './AuthenticatedHeader';

export default function ({username}) {
  const activeHeader = username ? <AuthenticatedHeader username={username} /> : <DefaultHeader />;

  return (
    <header className='container-fluid'>{activeHeader}</header>
  )
}
