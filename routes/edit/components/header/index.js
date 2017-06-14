import React from 'react'
import initialState from '../../config/initialState'
import DefaultHeader from './DefaultHeader'
import AuthenticatedHeader from './AuthenticatedHeader'

export default function() {
  if (!initialState.username) return <DefaultHeader {...initialState} />

  return <AuthenticatedHeader {...initialState} />
}
