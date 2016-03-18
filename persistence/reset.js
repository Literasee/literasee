import * as db from './db';
import { Project } from './models';

let projectData = require('./test-data/projects.json');
let projectDocs = [];

function clearProjects () {
  return Project.find().remove();
}

function loadProjects () {
  return Project.create(projectData).then((docs) => projectDocs = docs);
}

function printSummary () {
  var buffer = 'Imported ' + projectDocs.length + ' Projects';
  console.log(buffer);
}

db.open()
  .then(clearProjects)
  .then(loadProjects)
  .then(printSummary)
  .then(db.close);
