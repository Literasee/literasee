import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistory, routeReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const finalCreateStore = compose(
  applyMiddleware(thunk, syncHistory(browserHistory)),
)(createStore)

export default initialState => {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
