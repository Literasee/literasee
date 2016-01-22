import user from './user'
import gists from './gists'
import gist from './gist'
import openFiles from './openFiles'
import previewType from './previewType'
import { RECEIVE_USER_IMAGES } from '../actions'

export default {
  user,
  gists,
  gist,
  openFiles,
  previewType,
  images: (state = [], action) => {
    switch (action.type) {
      case RECEIVE_USER_IMAGES:
        return action.result.resources.map(res => res.url)

      default:
        return state
    }
  }
}
