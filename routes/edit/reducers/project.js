import _ from 'lodash'

import {
  PROJECT_FETCH_SUCCESS,
  CODE_CHANGED,
  SAVE_FILE_SUCCESS,
  UPDATE_PROJECT_DESCRIPTION_SUCCESS
} from '../actions'

export default function project (state = {}, action) {
  switch (action.type) {
    case PROJECT_FETCH_SUCCESS:
      return action.result;

    case SAVE_FILE_SUCCESS:
      return action.result;

    case UPDATE_PROJECT_DESCRIPTION_SUCCESS:
      return action.result;

    case CODE_CHANGED:
      return {...state, [action.projectType]: action.code};

    default:
      return state;
  }
}
