import user from './user'
import gists from './gists'
import gist from './gist'
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
  gist,
  openFiles,
  previewType,
  images,
  routing: routeReducer
});

export default rootReducer;
