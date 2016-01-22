import cookie from 'cookie'

export default (function () {
  var cookies = cookie.parse(document.cookie)

  return {
    token: cookies['literasee-token'] || null,
    username: cookies['literasee-username'] || null
  }
})()
