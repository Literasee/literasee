import {
  OPEN_FILE,
} from '../actions'

export default function (state = [], action) {
  switch (action.type) {
    case OPEN_FILE:
      if (state.indexOf(action.filename) > -1) return state
      return [...state, action.filename]

    default:
      return state
  }
}
