document.domain = 'literasee.io';
setTimeout(createMaximizeButtons, 5000);

function createMaximizeButtons () {
  document.querySelectorAll('iframe').forEach(i => {
    var doc = i.contentWindow.document;
    var id = parseQueryString(doc.location.search).childId;

    var b = document.createElement('button');
    b.setAttribute('id', 'maxBtn');
    b.innerText = 'maximize';
    b.onclick = function (e) {
      if (e.target.innerText === 'maximize') {
        max(id);
      } else {
        min(id);
      }
    }
    doc.body.appendChild(b);
  })
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

function max (id) {
  if (id.substr(0, 1) !== '#') id = '#' + id;

  var d = document.querySelector(id);
  d.style.setProperty('position', 'fixed');
  d.style.setProperty('top', 0);
  d.style.setProperty('right', 0);
  d.style.setProperty('bottom', 0);
  d.style.setProperty('left', 0);
  d.style.setProperty('margin', '0 2em');
  d.style.setProperty('display', 'flex');
  d.style.setProperty('flex-direction', 'column');
  d.style.setProperty('justify-content', 'center');

  var bg = document.createElement('div');
  bg.style.setProperty('position', 'absolute');
  bg.style.setProperty('background', 'white');
  bg.style.setProperty('opacity', 0.96);
  bg.style.setProperty('width', '100%');
  bg.style.setProperty('height', '100%');
  bg.onclick = min.bind(null, id);

  var i = d.querySelector('iframe');
  i.style.setProperty('position', 'relative');

  i.contentWindow.document.onkeyup = function (e) {
    if (e.keyCode === 27) min(id);
  }
  i.contentWindow.document.querySelector('#maxBtn').innerText = 'minimize';

  d.insertBefore(bg, i);
}

function min (id) {
  if (id.substr(0, 1) !== '#') id = '#' + id;

  var d = document.querySelector(id);
  d.style.removeProperty('position');
  d.style.removeProperty('top');
  d.style.removeProperty('right');
  d.style.removeProperty('bottom');
  d.style.removeProperty('left');
  d.style.removeProperty('margin');

  d.removeChild(d.querySelector('div'));

  var i = d.querySelector('iframe');
  i.style.removeProperty('position');
  i.contentWindow.document.onkeyup = null;
  i.contentWindow.document.querySelector('#maxBtn').innerText = 'maximize';
}
