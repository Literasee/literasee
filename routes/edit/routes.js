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

const verifyProjectType = (nextState, replace) => {
  if (!cookies.token) return replace({pathname: '/'});

  let { params: { type }, location: { pathname } } = nextState;
  if (pathname.substr(-1) !== '/') pathname += '/';

  if (['report', 'presentation', 'keywords', 'assets'].indexOf(type) < 0) {
    replace({pathname: pathname + 'report'});
  }
}

export default (
  <Route path='/' component={App}>
    <IndexRoute
      component={UserContainer} />

    <Route path=':username'>
      <IndexRoute
        onEnter={verifyToken}
        component={UserContainer} />

      <Route
        path='admin'
        onEnter={verifyToken}
        component={AdminContainer} />

      <Route
        path=':project(/:type)'
        onEnter={verifyProjectType}
        component={ProjectContainer} />

      <Route
        path=':owner/:project(/:type)'
        onEnter={verifyProjectType}
        component={ProjectContainer} />
    </Route>
  </Route>
)
