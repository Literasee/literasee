const marked = require('marked');

module.exports = function (req, res, next) {
  const type = req.params.type;
  const asset = req.params.asset;
  const project = res.locals.project;

  if (type !== 'report' || asset) {
    return next();
  }

  res.locals.styles = [
    '/public/gist-info.css'
  ];

  if (project.report.indexOf('id="literasee-tech-report"') > -1) {
    res.locals.styles.unshift('/public/css/technical.css');
  } else {
    res.locals.styles.unshift('/public/nciea.css');
  }

  res.locals.scripts = [
    '//d3js.org/d3.v4.min.js',
    '//pym.nprapps.org/pym.v1.min.js',
    '//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
    '/public/anchor.min.js',
    '//viz.literasee.io/utils.js'
  ];

  res.locals.title = project.description ? project.description.split('|')[0] : '';
  res.locals.body = marked(project.report);
  res.locals.gist_subdomain = project.isRepo ? '' : 'gist.';

  res.render('report', {
    partials: {
      infoHeader: 'info-header'
    },
    short_url: project.report_short_url,
    report_url: req.originalUrl.replace('presentation', 'report'),
    presentation_url: req.originalUrl.replace('report', 'presentation'),
    report_link_class: req.originalUrl.indexOf('report') > -1 ? ' active' : '',
    presentation_link_class: req.originalUrl.indexOf('presentation') > -1 ? ' active' : ''
  });
}
