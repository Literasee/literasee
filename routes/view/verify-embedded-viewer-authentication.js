module.exports = function (req, res, next) {
  const token = req.cookies['literasee-token'];

  if (!token) {
    res
      .status(401)
      .send('The embedded Literasee viewer requires authentication.')
  } else {
    next();
  }
}
