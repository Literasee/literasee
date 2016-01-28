import {
  RECEIVE_USER_IMAGES
} from '../actions'

export default function (state = [], action) {
  switch (action.type) {
    case RECEIVE_USER_IMAGES:
      return action.result.resources.map(res => res.url)

    default:
      return state
  }
}
