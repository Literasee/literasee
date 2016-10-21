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
  d.style.setProperty('z-index', 3000);
  d.style.setProperty('position', 'fixed');
  d.style.setProperty('top', 0);
  d.style.setProperty('right', 0);
  d.style.setProperty('bottom', 0);
  d.style.setProperty('left', 0);
  d.style.setProperty('display', 'flex');
  d.style.setProperty('flex-direction', 'column');
  d.style.setProperty('justify-content', 'center');
  d.style.setProperty('margin', '0 2em');
  if (d.classList.contains('full-width')) {
    d.classList.remove('full-width');
    d.setAttribute('data-fw', true);
  }

  var bg = document.createElement('div');
  bg.style.setProperty('position', 'absolute');
  bg.style.setProperty('background', 'white');
  bg.style.setProperty('opacity', 0.96);
  bg.style.setProperty('margin-left', '-2em');
  bg.style.setProperty('width', '100vw');
  bg.style.setProperty('height', '100vw');
  bg.onclick = min.bind(null, id);

  var i = d.querySelector('iframe');
  i.style.setProperty('position', 'relative');
  i.style.setProperty('visibility', 'hidden');

  d.insertBefore(bg, i);

  i.contentWindow.document.onkeyup = function (e) {
    if (e.keyCode === 27) min(id);
  }
  i.contentWindow.document.querySelector('#maxBtn').innerText = 'minimize';
  setTimeout(function () {
    i.contentWindow.pymChild.sendHeight();
    i.style.removeProperty('visibility');
  }, 100);
}

function min (id) {
  if (id.substr(0, 1) !== '#') id = '#' + id;

  var d = document.querySelector(id);
  d.style.removeProperty('z-index');
  d.style.removeProperty('position');
  d.style.removeProperty('top');
  d.style.removeProperty('right');
  d.style.removeProperty('bottom');
  d.style.removeProperty('left');
  d.style.removeProperty('margin');
  if (d.getAttribute('data-fw')) {
    d.classList.add('full-width');
    d.removeAttribute('data-fw');
  }

  d.removeChild(d.querySelector('div'));

  var i = d.querySelector('iframe');
  i.style.removeProperty('position');
  i.contentWindow.document.onkeyup = null;
  i.contentWindow.document.querySelector('#maxBtn').innerText = 'maximize';
  i.style.setProperty('visibility', 'hidden');
  setTimeout(function () {
    i.contentWindow.pymChild.sendHeight();
    i.style.removeProperty('visibility');
  }, 100);
}
