import _ from 'lodash'

import {
  PROJECT_FETCH_SUCCESS,
  ADD_FILE
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

    default:
      return state
  }
}
