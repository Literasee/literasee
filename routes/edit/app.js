import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Root from './config/routes';

// this import format (leading !!, specifically)
// instructs Webpack to not run this through configured loaders
import styles from '!!style!css!stylus!./app.styl';

ReactDOM.render(<Root />, document.getElementById('root'));
