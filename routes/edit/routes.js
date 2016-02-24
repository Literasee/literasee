import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import cookies from './config/cookies';

import App from './screens/App';
import UserContainer from './screens/App/screens/User/UserContainer';
import AdminContainer from './screens/App/screens/Admin/AdminContainer';
import ProjectContainer from './screens/App/screens/Project/ProjectContainer';

const verifyToken = (nextState, replace) => {
  if (!cookies.token) replace({pathname: '/'});
}

export default (
  <Route path='/' component={App}>
    <Route path=':username'>
      <IndexRoute
        onEnter={verifyToken} 
        component={UserContainer} />

      <Route
        path='admin'
        onEnter={verifyToken}
        component={AdminContainer} />

      <Redirect from=':gistId' to=':gistId/report' />
      <Route
        path=':gistId/:type'
        onEnter={verifyToken}
        component={ProjectContainer} />
    </Route>
  </Route>
)
