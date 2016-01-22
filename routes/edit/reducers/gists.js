import {
  GISTS_FETCH_SUCCESS
} from '../actions'

export default function (state = [], action) {
  switch (action.type) {
    case GISTS_FETCH_SUCCESS:
      return action.result;
    default:
      return state;
  }
}
