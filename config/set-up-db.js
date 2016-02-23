const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    owner: String,
    project: String,
    isPublished: Boolean,
    isRepo: Boolean,
    report: String,
    presentation: String,
    thumbnail: String,
    keywords: [String]
});

module.exports = function (models) {
  models.Project = mongoose.model('Project', ProjectSchema);

  return function (cb) {
    mongoose.connect(process.env.MONGOLAB_URI);
    const db = mongoose.connection;
    db.on('error', cb);
    db.once('open', cb);
  };
};
