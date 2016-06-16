import {
  PROJECTS_FETCH_SUCCESS
} from '../actions'

export default function (state = [], action) {
  switch (action.type) {
    case PROJECTS_FETCH_SUCCESS:
      return action.result;
    case 'SET_PROJECT_IGNORED_SUCCESS':
      return state.map((project) => {
        project.isIgnored = action.result.ignored.indexOf(project.id) > -1;
        return project;
      });
    default:
      return state;
  }
}
