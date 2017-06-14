import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'

import App from './screens/App'
import Homepage from './screens/homepage'
import UserContainer from './screens/App/screens/User/UserContainer'
import AdminContainer from './screens/App/screens/Admin/AdminContainer'
import ProjectContainer from './screens/App/screens/Project/ProjectContainer'

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
      <Route exact path="/:username" component={UserContainer} />
      <Route
        path="/:username/:project/:mode?"
        render={({ match }) =>
          <h1>
            {match.params.project} project by {match.params.username} in
            {' '}{match.params.mode} mode
          </h1>}
      />

      <Footer />
    </div>
  </Router>

// <IndexRoute component={UserContainer} />
//     <Route path=":username">
//       <IndexRoute onEnter={verifyToken} component={UserContainer} />

//       <Route path="admin" onEnter={verifyToken} component={AdminContainer} />

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
