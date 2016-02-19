import _ from 'lodash'

import {
  PROJECT_FETCH_SUCCESS,
  ADD_FILE,
  SAVE_FILE_SUCCESS
} from '../actions'

const templates = {
  'js': '// your code here',
  'md': '# Header'
}

export default function project (state = {}, action) {
  switch (action.type) {

    case PROJECT_FETCH_SUCCESS:
      let result = {...action.result}
      result.files = _.values(action.result.files)
      result.files.forEach(file => file.href = file.filename.split('.').join('-'))
      return result

    case ADD_FILE:
      state.files = [...state.files, {
        filename: action.filename,
        content: templates[action.filename.split('.').pop()]
      }]

    case SAVE_FILE_SUCCESS:
      // update the sha of the saved file
      const file = _.find(state.files, {filename: action.result.name});
      const newFiles = [
        ...state.files.slice(0, state.files.indexOf(file)),
        {...file, sha: action.result.sha},
        ...state.files.slice(state.files.indexOf(file) + 1)
      ]
      return {...state, files: newFiles};

    default:
      return state
  }
}
