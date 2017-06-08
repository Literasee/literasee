import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import initialState from './config/initialState'
import configureStore from './store/configureStore';

// this import format (leading !!, specifically)
// instructs Webpack to not run this through configured loaders
import styles from '!!style-loader!css-loader!stylus-loader!./app.styl';

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
