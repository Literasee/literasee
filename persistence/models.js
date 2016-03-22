const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    owner: String,
    project: String,
    description: String,
    isRepo: Boolean,
    isFeatured: Boolean,
    report: String,
    report_sha: String,
    report_short_url: String,
    presentation: String,
    presentation_sha: String,
    presentation_short_url: String,
    keywords: [String],
    keywords_sha: String,
    thumbnail: String,
    parallax_url: String,
    parallax_size: String,
    etag: String
});

exports.Project = mongoose.model('Project', ProjectSchema);