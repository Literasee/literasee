import fetch from 'isomorphic-fetch';
import request from 'superagent-bluebird-promise';
import cookies from './config/cookies';
import {
  getApiUrl,
  getFeaturedProjectsUrl,
  getProjectsUrl
} from './screens/App/shared/utils/urlUtil';

const GET_PROJECTS_URL = getApiUrl('projects');
const GET_PROJECT_URL = getApiUrl('project');

/*
 * USER
 */

export const USER_FETCH_START = 'USER_FETCH_START'
function requestUser () {
  return {
    type: USER_FETCH_START
  }
}

export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
function fetchUserSuccess(result) {
  return {
    type: USER_FETCH_SUCCESS,
    result
  }
}

export const USER_FETCH_ERROR = 'USER_FETCH_ERROR'
function fetchUserError(error) {
  return {
    type: USER_FETCH_ERROR,
    error
  }
}

export function fetchUser() {
  return dispatch => {
    dispatch(requestUser())

    return fetch('https://api.github.com/user', {
        headers: {
          'Authorization': 'token ' + cookies.token,
          'Accept': 'application/vnd.github.v3'
        }
      })
      .then(req => req.json(), err => console.error(err))
      .then(json => dispatch(fetchUserSuccess(json)))
  }
}

/*
 * PROJECTS
 */

export const PROJECTS_FETCH_START = 'PROJECTS_FETCH_START'
function requestProjects () {
 return {
   type: PROJECTS_FETCH_START
 }
}

export const PROJECTS_FETCH_SUCCESS = 'PROJECTS_FETCH_SUCCESS'
function fetchProjectsSuccess(result) {
 return {
   type: PROJECTS_FETCH_SUCCESS,
   result
 }
}

export const PROJECTS_FETCH_ERROR = 'PROJECTS_FETCH_ERROR'
function fetchProjectsError(error) {
 return {
   type: PROJECTS_FETCH_ERROR,
   error
 }
}

export function fetchProjects ({ username }) {
  return (dispatch) => {
    dispatch(requestProjects());

    request
      .get(`/api/projects/${username || 'featured'}`)
      .withCredentials()
      .end((err, result) => {
        if (err) return dispatch(fetchProjectsError(err));

        dispatch(fetchProjectsSuccess(result.body));
      });
  }
}

/*
* PROJECT
*/

export const PROJECT_FETCH_START = 'PROJECT_FETCH_START'
function requestProject (id) {
 return {
   type: PROJECT_FETCH_START,
   id
 }
}

export const PROJECT_FETCH_SUCCESS = 'PROJECT_FETCH_SUCCESS'
function fetchProjectSuccess(result) {
 return {
   type: PROJECT_FETCH_SUCCESS,
   result
 }
}

export const PROJECT_FETCH_ERROR = 'PROJECT_FETCH_ERROR'
function fetchProjectError(error) {
 return {
   type: PROJECT_FETCH_ERROR,
   error
 }
}

export function fetchProject({ username, owner, project }) {
  return (dispatch) => {
    dispatch(requestProject(project));

    request
      .get(`/api/projects/${owner || username}/${project}`)
      .withCredentials()
      .end((err, result) => {
        if (err) return dispatch(fetchProjectError(err));

        dispatch(fetchProjectSuccess(result.body));
      });
  }
}

/*
* CREATE GIST
*/


export const REQUEST_CREATE_GIST = 'REQUEST_CREATE_GIST'
function requestCreateGist () {
 return {
   type: REQUEST_CREATE_GIST
 }
}

export const RECEIVE_CREATE_GIST = 'RECEIVE_CREATE_GIST'
function receiveCreateGist (result) {
 return {
   type: RECEIVE_CREATE_GIST,
   result
 }
}

export const ERROR_CREATE_GIST = 'ERROR_CREATE_GIST'
function errorCreateGist (error) {
 return {
   type: ERROR_CREATE_GIST,
   error
 }
}

export function createGist(files) {
  return dispatch => {
    dispatch(requestCreateGist())

    return fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          'Authorization': 'token ' + cookies.token,
          'Accept': 'application/vnd.github.v3'
        },
        body: JSON.stringify({files})
      })
      .then(req => req.json(), err => console.error(err))
      .then(json => dispatch(receiveCreateGist(json)))
  }
}

export const CODE_CHANGED = 'CODE_CHANGED';
export function codeChanged (projectType, code) {
  return {
    type: CODE_CHANGED,
    projectType,
    code
  }
}

/*
* FILES
*/

export const SAVE_FILE = 'SAVE_FILE'
function saveFileStart (id, file) {
  return {
    type: SAVE_FILE,
    id,
    file
  }
}

export const SAVE_FILE_SUCCESS = 'SAVE_FILE_SUCCESS'
function saveFileSuccess(result) {
  return {
    type: SAVE_FILE_SUCCESS,
    result
  }
}

export const SAVE_FILE_ERROR = 'SAVE_FILE_ERROR'
function saveFileError(error) {
  return {
    type: SAVE_FILE_ERROR,
    error
  }
}

export function saveFile(params, project) {
  const { username, owner, project: pId, type } = params;

  return dispatch => {
    dispatch(saveFileStart(pId, type));

    const resolve = (result) => {
      return dispatch(saveFileSuccess(result.body));
    }
    const reject = (err) => {
      return dispatch(saveFileError(err));
    }

    return request
      .put(`/api/projects/${owner || username}/${pId}`)
      .withCredentials()
      .send({
        project,
        type
      })
      .then(resolve, reject);
  }
}

export const UPDATE_PROJECT_DESCRIPTION = 'UPDATE_PROJECT_DESCRIPTION';
function updateProjectDescriptionStart () {
  return {
    type: UPDATE_PROJECT_DESCRIPTION
  }
}

export const UPDATE_PROJECT_DESCRIPTION_SUCCESS = 'UPDATE_PROJECT_DESCRIPTION_SUCCESS';
function updateProjectDescriptionSuccess(result) {
  return {
    type: UPDATE_PROJECT_DESCRIPTION_SUCCESS,
    result
  }
}

export const UPDATE_PROJECT_DESCRIPTION_ERROR = 'UPDATE_PROJECT_DESCRIPTION_ERROR';
function updateProjectDescriptionError(error) {
  return {
    type: UPDATE_PROJECT_DESCRIPTION_ERROR,
    error
  }
}

export function updateProjectDescription(params, project, title = '', subTitle = '') {
  const { username, owner, project: pId } = params;

  return dispatch => {
    dispatch(updateProjectDescriptionStart());

    const resolve = (result) => {
      return dispatch(updateProjectDescriptionSuccess(result.body));
    }
    const reject = (err) => {
      return dispatch(updateProjectDescriptionError(err));
    }

    return request
      .patch(`/api/projects/${owner || username}/${pId}`)
      .withCredentials()
      .send({
        project,
        title: title.trim(),
        subTitle: subTitle.trim()
      })
      .then(resolve, reject);
  }
}

export const ADD_FILE = 'ADD_FILE'
export function addFile (filename) {
  return {
    type: ADD_FILE,
    filename
  }
}

export const OPEN_FILE = 'OPEN_FILE'
export function openFile (filename) {
  return {
    type: OPEN_FILE,
    filename
  }
}

/*
* FILES
*/

export const REQUEST_UPLOAD_FILES = 'REQUEST_UPLOAD_FILES'
function requestUploadFiles () {
 return {
   type: REQUEST_UPLOAD_FILES
 }
}

export const RECEIVE_UPLOAD_FILES = 'RECEIVE_UPLOAD_FILES'
function receiveUploadFiles (result) {
 return {
   type: RECEIVE_UPLOAD_FILES,
   result
 }
}

export const ERROR_UPLOAD_FILES = 'ERROR_UPLOAD_FILES'
function errorUploadFiles (error) {
 return {
   type: ERROR_UPLOAD_FILES,
   error
 }
}

export function uploadFiles(username, files) {
  return dispatch => {
    dispatch(requestUploadFiles())

    var data = new FormData()
    data.append('username', username)
    files.forEach((file, index) => data.append('file' + index, file))
    return fetch('/add_image', {
      method: 'POST',
      body: data
    })
    .then(req => req.json(), err => console.error(err))
    .then(json => dispatch(receiveUploadFiles(json)))
  }
}

export const REQUEST_USER_IMAGES = 'REQUEST_USER_IMAGES'
function requestUserImages () {
 return {
   type: REQUEST_USER_IMAGES
 }
}

export const RECEIVE_USER_IMAGES = 'RECEIVE_USER_IMAGES'
function receiveUserImages (result) {
 return {
   type: RECEIVE_USER_IMAGES,
   result
 }
}

export const ERROR_USER_IMAGES = 'ERROR_USER_IMAGES'
function errorUserImages (error) {
 return {
   type: ERROR_USER_IMAGES,
   error
 }
}

export function getUserImages(username) {
  return dispatch => {
    dispatch(requestUserImages())

    return fetch('/images/' + username)
      .then(req => req.json(), err => console.error(err))
      .then(json => dispatch(receiveUserImages(json)))
  }
}

/*
* PREVIEW TYPE
*/

export const SET_PREVIEW_TYPE = 'SET_PREVIEW_TYPE'
export function setPreviewType (previewType) {
 return {
   type: SET_PREVIEW_TYPE,
   previewType
 }
}
