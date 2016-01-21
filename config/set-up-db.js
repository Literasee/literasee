const mongoose = require('mongoose');

module.exports = function (models) {
  return function (cb) {
    models.Gist = mongoose.model('Gist', mongoose.Schema({
      id: String,
      details: String,
      keywords: [String]
    }));

    mongoose.connect(process.env.MONGOLAB_URI);
    const db = mongoose.connection;
    db.on('error', cb);
    db.once('open', cb);
  };
};
