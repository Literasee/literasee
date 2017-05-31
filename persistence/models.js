const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    owner: String,
    project: String,
    description: String,
    style: String,
    isFeatured: Boolean,
    source: String,
    source_sha: String,
    report_short_url: String,
    thumbnail: String,
    parallax_url: String,
    parallax_size: String,
    etag: String,
    avatar_url: String
});

exports.Project = mongoose.model('Project', ProjectSchema);

const UserSchema = new Schema({
    username: String,
    repos: String,
    repos_etag: String,
    ignored: {type: [String], default: []}
});

exports.User = mongoose.model('User', UserSchema);
