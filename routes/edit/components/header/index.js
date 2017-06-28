import React from 'react'
import DefaultHeader from './DefaultHeader'
import AuthenticatedHeader from './AuthenticatedHeader'
import cookies from '../../cookies'

export default function() {
  const { username, token } = cookies()

  if (username) return <AuthenticatedHeader username={username} token={token} />

  return <DefaultHeader />
}
