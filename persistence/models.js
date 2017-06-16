const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  avatar_url: String,
  owner: String,
  name: String,
  description: String,
  isFeatured: Boolean,
  source: String,
  source_sha: String,
  short_url: String,
  thumbnail: String,
  etag: String,
})

exports.Project = mongoose.model('Project', ProjectSchema)

const UserSchema = new Schema({
  etag: String,
  repos: String,
  username: String,
})

exports.User = mongoose.model('User', UserSchema)
