import cookie from 'cookie';

export default (function () {
  var cookies = cookie.parse(document.cookie);

  return {
    token: cookies.token || null,
    username: cookies.username || null
  };
})()
