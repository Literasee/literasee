
export function getApiUrl (endpoint) {
  const { protocol, hostname, port } = document.location;
  const host = hostname.replace(hostname.split('.')[0], 'api');

  return `${protocol}//${host}:${port}/${endpoint}/`;
}

export function getProjectViewUrl (props) {
  const { owner, projectId, type } = props;
  const { protocol, hostname, port } = document.location;
  const host = hostname.replace(hostname.split('.')[0], 'view');

  return `${protocol}//${host}:${port}/${owner}/${projectId}/${type}/`;
}
