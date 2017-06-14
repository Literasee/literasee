import React from 'react'
import initialState from '../config/initialState'
import ProjectGrid from '../components/projectGrid'

export default () =>
  <main role="main">
    <ProjectGrid username={initialState.username} />
  </main>
