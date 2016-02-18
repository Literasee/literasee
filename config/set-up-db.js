const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    username: String,
    id: String,
    isRepo: Boolean,
    hasReport: { type: Boolean, default: true },
    hasPresentation: { type: Boolean, default: true },
    hasThumbnail: { type: Boolean, default: false },
    summary_json: String,
    contents_json: String,
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
