import React from 'react'
import Carousel from '../components/carousel'
import ProjectGrid from '../components/projectGrid'

export default ({ match }) =>
  <main role="main">
    {!match.params.username && <Carousel />}
    <ProjectGrid />
  </main>
