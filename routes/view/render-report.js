const marked = require('marked');

module.exports = function (req, res, next) {
  const type = req.params.type;
  const asset = req.params.asset;
  const project = res.locals.project;

  if (type !== 'report' || asset) {
    return next();
  }

  res.locals.styles = [
    '/public/nciea.css',
    '/public/gist-info.css'
  ];

  res.locals.scripts = [
    '/public/d3.min.js',
    '/public/d3-maximize.min.js',
    '//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
    '/public/anchor.min.js'
  ];

  res.locals.title = project.description.split('|')[0];
  res.locals.body = marked(project.report);
  res.locals.show_button = project.presentation;
  res.locals.gist_subdomain = project.isRepo ? '' : 'gist.';

  res.render('report', {
    partials: {
      infoHeader: 'info-header'
    },
    short_url: project.report_short_url,
    button_label: 'Presentation',
    button_url: req.originalUrl.replace('report', 'presentation')
  });
}
