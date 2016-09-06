document.addEventListener('DOMContentLoaded', function(event) {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 'body{margin:0}.overlay{position:absolute;top:0;left:0;width:100%;height:100vh;display:flex;justify-content:center;align-items:center;background-color:rgba(0,121,191,.25);border:5px solid #0067A3;box-sizing:border-box}';
  document.getElementsByTagName('head')[0].appendChild(style);

  if (document.location.search.indexOf('overlay=true') > 0) {
    overlay();
  }
});

function handleResize () {
  document
    .querySelector('.overlay')
    .textContent = window.innerWidth + 'x' + window.innerHeight;
}

function overlay () {
  var overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
  window.onresize = handleResize;
  handleResize();
  return overlay;
}
