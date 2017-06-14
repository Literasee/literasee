import React from 'react'
import { render } from 'react-dom'
import Router from './routes'

// this import format (leading !!, specifically)
// instructs Webpack to not run this through configured loaders
import styles from '!!style-loader!css-loader!stylus-loader!./app.styl'

render(<Router />, document.getElementById('root'))
