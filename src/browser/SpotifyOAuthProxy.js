function getCode(success, error, opts) {
  //  code = window.localStorage.getItem('SpotifyOAuthData2');
  //  if (code) {
  //  } else {
  console.log("getCode");
  var client_id = opts[0];
  var redirect_uri = opts[1];
  var scope = opts[4];
  console.log("client_id: ", client_id);
  console.log("redirect_uri: ", redirect_uri);
  console.log("scope: ", scope);
  var state = '1234567890123456';
  var url = 'https://accounts.spotify.com/authorize?response_type=code&client_id=' + client_id + '&scope=' + scope + '&redirect_uri=' + redirect_uri + '&state=' + state + '&show_dialog=true';
  console.log(encodeURI(url));
  var child = createPop(url, "Spotify");
  var timer = setInterval(checkChild, 500);
  function checkChild() {
    if (child.closed) {
      clearInterval(timer);
      var code = window.localStorage.getItem('SpotifyOAuthData2');
      window.localStorage.removeItem('SpotifyOAuthData2');
      success({ code });
    }
  }
}
//}



function createPop(url, name) {
  var newwindow = window.open(url, name, 'width=560,height=600,toolbar=0,menubar=0,location=0');
  if (window.focus) { newwindow.focus() }
  return newwindow;
}


module.exports = {
  getCode: getCode
};

require('cordova/exec/proxy').add('SpotifyOAuth', module.exports);