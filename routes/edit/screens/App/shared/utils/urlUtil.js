function getBaseUrl () {
  const { protocol, hostname, port } = document.location;
  let host;

  if (hostname.split('.').length === 3) {
    host = hostname.replace(hostname.split('.')[0], 'api');
  } else {
    host = 'api.' + hostname;
  }

  return `${protocol}//${host}:${port}/`;
}

export function getApiUrl (endpoint) {
  const { protocol, hostname, port } = document.location;
  const host = hostname.replace(hostname.split('.')[0], 'api');

  return `${protocol}//${host}:${port}/${endpoint}/`;
}

export function getProjectViewUrl (props, stateType, query = '') {
  const { username, project } = props;
  const { protocol, hostname, port } = document.location;
  const host = hostname.replace(hostname.split('.')[0], 'view');
  const type = stateType || props.type;
  const projectPath = project.full_name || username + '/' + project.id;

  return `${protocol}//${host}:${port}/${projectPath}/${type}/${query}`;
}

export function getFeaturedProjectsUrl () {
  return getBaseUrl() + 'featured_projects';
}

export const UPDATE_PROJECT_DESCRIPTION_URL = (function () {
  return getBaseUrl() + 'update_project_description';
})();

export function getProjectsUrl () {
  return getBaseUrl() + 'projects';
}

export function getPublishProjectUrl () {
  return getBaseUrl() + 'publish';
}
