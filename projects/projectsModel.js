const db = require('../data/dbConfig');

module.exports = {
  addProject,
  addAction,
  getProjectById,
  getProjectActions,
};

function addProject(data) {
  return db('projects').insert(data);
}

function addAction(data) {
  return db('actions').insert(data);
}

function getProjectById(id) {
  return db('projects')
    .innerJoin('actions', 'projects.id', 'actions.project_id')
    .where({ project_id: id })
    .select(
      'projects.id',
      'projects.name',
      'projects.description',
      'projects.completed',
    )
    .first();
}

function getProjectActions(id) {
  return db('actions')
    .where({ project_id: id })
    .select(
      'actions.id',
      'actions.description',
      'actions.notes',
      'actions.completed',
    )
    .first();
}
