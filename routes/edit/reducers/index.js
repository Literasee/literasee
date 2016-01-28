import user from './user'
import gists from './gists'
import project from './project'
import openFiles from './openFiles'
import previewType from './previewType'
import images from './images'

import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  token: (state = null, action) => state,
  username: (state = null, action) => state,
  user,
  gists,
  project,
  openFiles,
  previewType,
  images,
  routing: routeReducer
});

export default rootReducer;
