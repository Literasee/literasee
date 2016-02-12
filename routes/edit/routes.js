import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './screens/App';
import User from './screens/App/screens/User';
import AdminContainer from './screens/App/screens/Admin/AdminContainer';
import ProjectContainer from './screens/App/screens/Project/ProjectContainer';

export default (
  <Route path='/' component={App}>
    <Route path=':username'>
      <IndexRoute component={User} />
      <Route path='admin' component={AdminContainer} />
      <Redirect from=':gistId' to=':gistId/report' />
      <Route path=':gistId/:type' component={ProjectContainer} />
    </Route>
  </Route>
)
