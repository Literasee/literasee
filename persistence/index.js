import { Project } from './models';

export function getFeaturedProjects () {
  // TODO: limit to featured projects
  return Project.find();
}

export function getProjects (id) {
  return Project.find();
}

export function getProject ({owner, project}) {
  return Project.findOne({owner, project});
}

export function saveProject (project) {
  const conditions = { owner: project.owner, project: project.project };
  return Project.findOneAndUpdate(conditions, project, {
    new: true,
    upsert: true
  });
}
