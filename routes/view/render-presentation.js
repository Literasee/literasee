const marked = require('marked');

module.exports = function (req, res, next) {
  const type = req.params.type;
  const asset = req.params.asset;
  const project = res.locals.project;

  if (type !== 'presentation' || asset) {
    return next();
  }

  res.locals.styles = [
    '/public/nciea.css'
  ];

  res.locals.scripts = [
    '/public/d3.min.js',
    '/public/d3-maximize.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
  ];

  res.locals.title = project.description.split('|')[0];
  res.locals.description = project.description.replace('|', ' – ');
  res.locals.owner = project.owner;

  res.render('presentation', {
    partials: {
      infoHeader: 'info-header'
    },
    short_url: project.presentation_short_url,
    report_url: req.originalUrl.replace('presentation', 'report'),
    presentation_url: req.originalUrl.replace('report', 'presentation'),
    report_link_class: req.originalUrl.indexOf('report') > -1 ? ' active' : '',
    presentation_link_class: req.originalUrl.indexOf('presentation') > -1 ? ' active' : ''
  });
}
