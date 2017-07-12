import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'

import Dashboard from './screens/dashboard'
import ProjectScreen from './screens/project'

export default () =>
  <Router>
    <div className="wrapper">
      <Header />

      <Route exact path="/" component={Dashboard} />
      <Route exact path="/:username" component={Dashboard} />
      <Route
        exact
        path="/:username/:project"
        render={({ match }) => <Redirect to={`${match.url}/edit`.replace('//', '/')} />}
      />
      <Switch>
        <Route path="/:username/:owner/:project/:mode" component={ProjectScreen} />
        <Route path="/:username/:project/:mode" component={ProjectScreen} />
      </Switch>

      <Footer />
    </div>
  </Router>
