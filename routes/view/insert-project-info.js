var bodyTag = '</body>'
var fragments

module.exports = function (html, tag) {
  // preference is just inside closing body tag
  // last resort is tack onto the end
  if (html.indexOf(bodyTag) > -1) {
    fragments = html.split(bodyTag)
    fragments.splice(1, 0, tag, bodyTag)
  } else {
    fragments = [html, tag]
  }

  return fragments.join('')
}
