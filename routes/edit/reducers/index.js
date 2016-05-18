import user from './user';
import projects from './projects';
import project from './project';
import images from './images';

import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  token: (state = null, action) => state,
  username: (state = null, action) => state,
  oauthUrl: (state = null, action) => state,
  user,
  projects,
  project,
  images,
  routing: routeReducer
});

export default rootReducer;
