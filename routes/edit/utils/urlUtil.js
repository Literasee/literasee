export function getProjectViewUrl(params) {
  const { protocol, hostname, port } = document.location
  const host = 'view.' + hostname.replace('edit.', '')
  const { username, owner, project } = params

  return `${protocol}//${host}:${port}/${owner || username}/${project}/`
}
