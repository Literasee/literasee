import cookie from 'cookie';

export default (function () {
  var cookies = cookie.parse(document.cookie);

  return {
    token: cookies.token || null,
    username: cookies.username || null,
    oauthUrl: `https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}&scope=repo`
  };
})()
