import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './screens/App';
import User from './screens/App/screens/User'
import Project from './screens/App/screens/Project'

export default (
  <Route path="/" component={App}>
    <Route path=":username">
      <IndexRoute component={User} />
      <Route path=":gistId" component={Project}/>
    </Route>
  </Route>
)
