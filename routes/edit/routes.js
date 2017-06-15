import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'

import Homepage from './screens/homepage'
import UserDashboard from './screens/userDashboard'
import ProjectScreen from './screens/App/screens/Project'

const verifyToken = (nextState, replace) => {
  const { hostname, pathname } = document.location

  // you cannot view another user's editor
  if (hostname.indexOf('edit') === 0) {
    if (!initialState.username || pathname.indexOf(initialState.username) < 0) {
      replace({ pathname: '/' })
    }
  }
}

const verifyProjectType = (nextState, replace) => {
  const { hostname } = document.location

  // only authenticated users can use the editor
  if (hostname.indexOf('edit') === 0 && !initialState.username) {
    return replace({ pathname: '/' })
  }

  let { params: { mode }, location: { pathname } } = nextState
  if (pathname.substr(-1) !== '/') pathname += '/'

  // direct to report editing by default
  mode = ['edit', 'preview'].indexOf(mode) < 0 ? 'edit' : null
  if (mode) replace({ pathname: pathname + mode })
}

export default () =>
  <Router>
    <div className="wrapper">
      <Header />

      <Route exact path="/" component={Homepage} />
      <Route exact path="/:username" component={UserDashboard} />
      <Switch>
        <Route path="/:username/:project/:mode?" component={ProjectScreen} />
        <Route path="/:username/:owner/:project/:mode?" component={ProjectScreen} />
      </Switch>

      <Footer />
    </div>
  </Router>

// <IndexRoute component={UserContainer} />
//     <Route path=":username">
//       <IndexRoute onEnter={verifyToken} component={UserContainer} />

//       <Route
//         path=":project(/:mode)"
//         onEnter={verifyProjectType}
//         component={ProjectContainer}
//       />

//       <Route
//         path=":owner/:project(/:mode)"
//         onEnter={verifyProjectType}
//         component={ProjectContainer}
//       />
//     </Route>
