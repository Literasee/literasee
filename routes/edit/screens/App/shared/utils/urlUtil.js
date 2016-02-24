function getBaseUrl () {
  const { protocol, hostname, port } = document.location;
  const host = hostname.replace(hostname.split('.')[0], 'api');

  return `${protocol}//${host}:${port}/`;
}

export function getApiUrl (endpoint) {
  const { protocol, hostname, port } = document.location;
  const host = hostname.replace(hostname.split('.')[0], 'api');

  return `${protocol}//${host}:${port}/${endpoint}/`;
}

export function getProjectViewUrl (props, stateType, query = '') {
  const { owner, projectId } = props;
  const { protocol, hostname, port } = document.location;
  const host = hostname.replace(hostname.split('.')[0], 'view');
  const type = stateType || props.type;

  return `${protocol}//${host}:${port}/${owner}/${projectId}/${type}${query}`;
}

export function getPublishProjectUrl () {
  return getBaseUrl() + 'publish';
}
