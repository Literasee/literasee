document.addEventListener('DOMContentLoaded', function(event) {
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = 'body{margin:0}.overlay{position:absolute;top:0;left:0;width:100%;height:100vh;display:flex;justify-content:center;align-items:center;background-color:rgba(0,121,191,.25);border:5px solid #0067A3;box-sizing:border-box}';
  document.getElementsByTagName('head')[0].appendChild(style);

  if (document.location.search.indexOf('overlay=true') > 0) {
    overlay();
  }
});

function overlay () {
  var overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
  window.onresize = handleResize;
  handleResize();
  return overlay;
}

function handleResize () {
  document
    .querySelector('.overlay')
    .textContent = window.innerWidth + 'x' + window.innerHeight;
}

function parseQueryString (str) {
  str = str || window.location.search;
  if (str.substr(0, 1) === '?') str = str.substr(1);

  if (!str) return {};

  return str.split('&').reduce(function (prev, pair) {
    prev[pair.split('=')[0]] = pair.split('=')[1];
    return prev;
  }, {});
}

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

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
  }
}
