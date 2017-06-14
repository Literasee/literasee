import { USER_FETCH_SUCCESS } from '../actions'

export default function gist(state = null, action) {
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      return action.result
    default:
      return state
  }
}
