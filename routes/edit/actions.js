import fetch from 'isomorphic-fetch'
import request from 'superagent-bluebird-promise'
import initialState from './config/initialState'
import {
  getApiUrl,
  getFeaturedProjectsUrl,
  getProjectsUrl,
} from './screens/App/shared/utils/urlUtil'

const GET_PROJECTS_URL = getApiUrl('projects')
const GET_PROJECT_URL = getApiUrl('project')

/*
 * PROJECTS
 */

export const PROJECTS_FETCH_START = 'PROJECTS_FETCH_START'
function requestProjects() {
  return {
    type: PROJECTS_FETCH_START,
  }
}

export const PROJECTS_FETCH_SUCCESS = 'PROJECTS_FETCH_SUCCESS'
function fetchProjectsSuccess(result) {
  return {
    type: PROJECTS_FETCH_SUCCESS,
    result,
  }
}

export const PROJECTS_FETCH_ERROR = 'PROJECTS_FETCH_ERROR'
function fetchProjectsError(error) {
  return {
    type: PROJECTS_FETCH_ERROR,
    error,
  }
}

export function fetchProjects(username) {
  return dispatch => {
    dispatch(requestProjects())

    request
      .get(`/api/${username || 'featured'}`)
      .withCredentials()
      .end((err, result) => {
        if (err) return dispatch(fetchProjectsError(err))

        dispatch(fetchProjectsSuccess(result.body))
      })
  }
}

/*
 * PROJECT ADMIN
 */

export function setProjectsIgnoredState(username, projectIds, ignored) {
  return dispatch => {
    dispatch({ type: 'SET_PROJECT_IGNORED_START' })

    request
      .put(`/api/${username}/ignore`)
      .withCredentials()
      .send({
        projectIds,
        ignored,
      })
      .end((err, result) => {
        if (err)
          return dispatch({
            type: 'SET_PROJECT_IGNORED_ERROR',
            error: err,
          })

        dispatch({
          type: 'SET_PROJECT_IGNORED_SUCCESS',
          result: result.body,
        })
      })
  }
}

/*
* PROJECT
*/

export const PROJECT_FETCH_START = 'PROJECT_FETCH_START'
function requestProject(id) {
  return {
    type: PROJECT_FETCH_START,
    id,
  }
}

export const PROJECT_FETCH_SUCCESS = 'PROJECT_FETCH_SUCCESS'
function fetchProjectSuccess(result) {
  return {
    type: PROJECT_FETCH_SUCCESS,
    result,
  }
}

export const PROJECT_FETCH_ERROR = 'PROJECT_FETCH_ERROR'
function fetchProjectError(error) {
  return {
    type: PROJECT_FETCH_ERROR,
    error,
  }
}

export function fetchProject({ username, owner, project }) {
  return dispatch => {
    dispatch(requestProject(project))

    request
      .get(`/api/${owner || username}/${project}`)
      .withCredentials()
      .end((err, result) => {
        if (err) return dispatch(fetchProjectError(err))

        dispatch(fetchProjectSuccess(result.body))
      })
  }
}

/*
* CREATE REPO
*/

export const REQUEST_CREATE_REPO = 'REQUEST_CREATE_REPO'
function requestCreateRepo() {
  return {
    type: REQUEST_CREATE_REPO,
  }
}

export const RECEIVE_CREATE_REPO = 'RECEIVE_CREATE_REPO'
function receiveCreateRepo(result) {
  return {
    type: RECEIVE_CREATE_REPO,
    result,
  }
}

export const ERROR_CREATE_REPO = 'ERROR_CREATE_REPO'
function errorCreateRepo(error) {
  return {
    type: ERROR_CREATE_REPO,
    error,
  }
}

export function createRepo() {
  return dispatch => {
    dispatch(requestCreateRepo())

    return fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        Authorization: 'token ' + initialState.token,
        Accept: 'application/vnd.github.v3',
      },
      body: JSON.stringify({
        name: 'literasee-created-repo',
      }),
    })
      .then(req => req.json(), err => console.error(err))
      .then(json => dispatch(receiveCreateRepo(json)))
  }
}

/*
* CREATE FILE
*/

export const REQUEST_CREATE_FILE = 'REQUEST_CREATE_FILE'
function requestCreateFile() {
  return {
    type: REQUEST_CREATE_FILE,
  }
}

export const RECEIVE_CREATE_FILE = 'RECEIVE_CREATE_FILE'
function receiveCreateFile(result) {
  return {
    type: RECEIVE_CREATE_FILE,
    result,
  }
}

export const ERROR_CREATE_FILE = 'ERROR_CREATE_FILE'
function errorCreateFile(error) {
  return {
    type: ERROR_CREATE_FILE,
    error,
  }
}

export function createFile(params, projectName, path, content) {
  const { username, owner } = params

  return dispatch => {
    dispatch(requestCreateFile())

    return request
      .put(`/api/${owner || username}/${projectName}/add`)
      .withCredentials()
      .send({
        path,
        content,
      })
      .then(result => dispatch(receiveCreateFile(result.body)))
      .catch(err => console.error(err))
  }
}

export const CODE_CHANGED = 'CODE_CHANGED'
export function codeChanged(code) {
  return {
    type: CODE_CHANGED,
    code,
  }
}

/*
* FILES
*/

export const SAVE_FILE = 'SAVE_FILE'
function saveFileStart(id, file) {
  return {
    type: SAVE_FILE,
    id,
    file,
  }
}

export const SAVE_FILE_SUCCESS = 'SAVE_FILE_SUCCESS'
function saveFileSuccess(result) {
  return {
    type: SAVE_FILE_SUCCESS,
    result,
  }
}

export const SAVE_FILE_ERROR = 'SAVE_FILE_ERROR'
function saveFileError(error) {
  return {
    type: SAVE_FILE_ERROR,
    error,
  }
}

export function saveFile(params, project, type) {
  const { username, owner, project: pId } = params

  return dispatch => {
    dispatch(saveFileStart(pId, type))

    const resolve = result => {
      return dispatch(saveFileSuccess(result.body))
    }
    const reject = err => {
      return dispatch(saveFileError(err))
    }

    return request
      .put(`/api/${owner || username}/${pId}`)
      .withCredentials()
      .send({
        project,
        type,
      })
      .then(resolve, reject)
  }
}

export const UPDATE_PROJECT_DESCRIPTION = 'UPDATE_PROJECT_DESCRIPTION'
function updateProjectDescriptionStart() {
  return {
    type: UPDATE_PROJECT_DESCRIPTION,
  }
}

export const UPDATE_PROJECT_DESCRIPTION_SUCCESS =
  'UPDATE_PROJECT_DESCRIPTION_SUCCESS'
function updateProjectDescriptionSuccess(result) {
  return {
    type: UPDATE_PROJECT_DESCRIPTION_SUCCESS,
    result,
  }
}

export const UPDATE_PROJECT_DESCRIPTION_ERROR =
  'UPDATE_PROJECT_DESCRIPTION_ERROR'
function updateProjectDescriptionError(error) {
  return {
    type: UPDATE_PROJECT_DESCRIPTION_ERROR,
    error,
  }
}

export function updateProjectDescription(
  params,
  project,
  title = '',
  subTitle = '',
) {
  const { username, owner, project: pId } = params

  return dispatch => {
    dispatch(updateProjectDescriptionStart())

    const resolve = result => {
      return dispatch(updateProjectDescriptionSuccess(result.body))
    }
    const reject = err => {
      return dispatch(updateProjectDescriptionError(err))
    }

    return request
      .patch(`/api/${owner || username}/${pId}`)
      .withCredentials()
      .send({
        project,
        title: title.trim(),
        subTitle: subTitle.trim(),
      })
      .then(resolve, reject)
  }
}

export const ADD_FILE = 'ADD_FILE'
export function addFile(filename) {
  return {
    type: ADD_FILE,
    filename,
  }
}

export const OPEN_FILE = 'OPEN_FILE'
export function openFile(filename) {
  return {
    type: OPEN_FILE,
    filename,
  }
}

/*
* FILES
*/

export const REQUEST_UPLOAD_FILES = 'REQUEST_UPLOAD_FILES'
function requestUploadFiles() {
  return {
    type: REQUEST_UPLOAD_FILES,
  }
}

export const RECEIVE_UPLOAD_FILES = 'RECEIVE_UPLOAD_FILES'
function receiveUploadFiles(result) {
  return {
    type: RECEIVE_UPLOAD_FILES,
    result,
  }
}

export const ERROR_UPLOAD_FILES = 'ERROR_UPLOAD_FILES'
function errorUploadFiles(error) {
  return {
    type: ERROR_UPLOAD_FILES,
    error,
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
      body: data,
    })
      .then(req => req.json(), err => console.error(err))
      .then(json => dispatch(receiveUploadFiles(json)))
  }
}

export const REQUEST_USER_IMAGES = 'REQUEST_USER_IMAGES'
function requestUserImages() {
  return {
    type: REQUEST_USER_IMAGES,
  }
}

export const RECEIVE_USER_IMAGES = 'RECEIVE_USER_IMAGES'
function receiveUserImages(result) {
  return {
    type: RECEIVE_USER_IMAGES,
    result,
  }
}

export const ERROR_USER_IMAGES = 'ERROR_USER_IMAGES'
function errorUserImages(error) {
  return {
    type: ERROR_USER_IMAGES,
    error,
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
export function setPreviewType(previewType) {
  return {
    type: SET_PREVIEW_TYPE,
    previewType,
  }
}
