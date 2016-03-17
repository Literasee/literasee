import marked from 'marked';

export default function (req, res, next) {
  const { type, asset } = req.params;
  const { project } = res.locals;

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
    '//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
  ];

  res.locals.title = project.description.split('|')[0];
  res.locals.body = marked(project.report);

  res.render('report');
}
