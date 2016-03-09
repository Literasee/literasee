import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema({
    owner: String,
    project: String,
    description: String,
    isRepo: Boolean,
    isFeatured: Boolean,
    report: String,
    presentation: String,
    keywords: [String],
    thumbnail: String,
    etag: String
});

export const Project = mongoose.model('Project', ProjectSchema);
