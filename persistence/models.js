import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema({
    owner: String,
    project: String,
    description: String,
    isRepo: Boolean,
    isFeatured: Boolean,
    report: String,
    report_sha: String,
    presentation: String,
    presentation_sha: String,
    keywords: [String],
    keywords_sha: String,
    thumbnail: String,
    etag: String
});

export const Project = mongoose.model('Project', ProjectSchema);
