import {
  SET_PREVIEW_TYPE,
  OPEN_FILE
} from '../actions'

export default function previewType(state = '', action) {
  switch (action.type) {
    case SET_PREVIEW_TYPE:
      return action.previewType;

    case OPEN_FILE:
      switch (action.filename) {
        case 'index-md':
        case 'index-html':
          return ''

        case 'slides-md':
          return 'slides'

        case 'tufte-md':
          return 'tufte'

        default:
          return state;
      }
      return state;

    default:
      return state;
  }
}
