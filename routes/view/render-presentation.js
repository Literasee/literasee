const marked = require('marked');

module.exports = function (req, res, next) {
  const type = req.params.type;
  const asset = req.params.asset;
  const project = res.locals.project;

  if (type !== 'presentation' || asset) {
    return next();
  }

  res.locals.styles = [
    '/public/nciea.css',
    '/public/gist-info.css'
  ];

  res.locals.scripts = [
    '/public/d3.min.js',
    '/public/d3-maximize.min.js',
    '//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
  ];

  res.locals.title = project.description.split('|')[0];
  res.locals.description = project.description.replace('|', ' – ');
  res.locals.owner = project.owner;
  res.locals.show_button = project.report;

  res.render('presentation', {
    partials: {
      infoHeader: 'info-header'
    },
    short_url: project.presentation_short_url,
    button_label: 'Report',
    button_url: req.originalUrl.replace('presentation', 'report')
  });
}
