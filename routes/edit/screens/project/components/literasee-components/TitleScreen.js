import React from 'react'
import Screen from './Screen'

export default ({ bgImage, margin, children, ...passThru }) => (
  <Screen
    bgImage={bgImage}
    contentClasses="flex text-4xl pl-8 w-screen"
    margin={margin}
    {...passThru}
  >
    {children}
  </Screen>
)
