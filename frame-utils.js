// this function should only be used during development
// will synchronously load and inject scripts from a URL
// for pages that would normally be loaded within an iframe
// and have the scripts provided by the page in which they're embedded
function addScriptSync (url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.send(null);

  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.innerHTML = request.responseText;
  document.querySelector('head').appendChild(s);
}

// during development we're likely not in an iframe
// and need to load our own lib dependencies
// if we're in an iframe we'll simply create local(ly global) refs
if (window === window.top) {
  addScriptSync('//d3js.org/d3.v4.min.js');
  addScriptSync('//cdn.jsdelivr.net/lodash/4.15.0/lodash.min.js');
  // pym can't be loaded this way but isn't needed unless embedded anyhow
} else {
  window.d3 = window.top.d3;
  window._ = window.top._;
  window.pym = window.top.pym;
}

// once the page loads we set margins to zero
// and optionally create overlay for debugging
document.addEventListener('DOMContentLoaded', function(event) {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 'body{margin:0}.overlay{position:absolute;top:0;left:0;width:100%;height:100vh;display:flex;justify-content:center;align-items:center;background-color:rgba(0,121,191,.25);border:5px solid #0067A3;box-sizing:border-box}';
  document.querySelector('head').appendChild(style);

  // if requested, created overlay div and set up resize handler
  if (document.location.search.indexOf('overlay=true') > 0) {
    function onresize () {
      document
        .querySelector('.overlay')
        .textContent = window.innerWidth + 'x' + window.innerHeight;
    }

    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    window.onresize = onresize;
    onresize();
  }
});

// util function to be used by various charts
function parseQueryString (str) {
  str = str || window.location.search;
  if (str.substr(0, 1) === '?') str = str.substr(1);

  if (!str) return {};

  return str.split('&').reduce(function (prev, pair) {
    prev[pair.split('=')[0]] = pair.split('=')[1];
    return prev;
  }, {});
}

// make a chart responsive
function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);

  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
  }
}
