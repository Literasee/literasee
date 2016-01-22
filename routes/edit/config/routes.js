import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import { syncHistory, routeReducer } from 'redux-simple-router';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import cookies from './cookies'

const reducer = combineReducers(Object.assign({}, reducers, {
    token: (state = null, action) => state,
    username: (state = null, action) => state,
    routing: routeReducer
}));
const history = createHistory();

const reduxRouterMiddleware = syncHistory(history);

const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunk)(createStore)

const store = createStoreWithMiddleware(reducer, cookies)



import App from '../screens/App'
import User from '../screens/App/screens/User'
import Editor from '../screens/App/screens/User/screens/Editor'

import { openFile } from '../actions'

const onEnterFilePath = (nextState, replaceState) => {
  store.dispatch(openFile(nextState.params.file))
}

import AppShell from '../screens/App/shared/components/AppShell';

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={AppShell}>
            <Route path=":username">
              <IndexRoute component={User} />
              <Route path=":gistId" component={Editor}>
                <Route path=":file" onEnter={onEnterFilePath} />
              </Route>
            </Route>
          </Route>
        </Router>
      </Provider>
    )
  }
}
