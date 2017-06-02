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

export function getProjectViewUrl (params) {
  const { protocol, hostname, port } = document.location;
  const host = 'view.' + hostname.replace('edit.', '');
  const { username, owner, project } = params;

  return `${protocol}//${host}:${port}/${owner || username}/${project}/`;
}

export function getFeaturedProjectsUrl () {
  return getBaseUrl() + 'featured_projects';
}

export function getProjectsUrl () {
  return getBaseUrl() + 'projects';
}
