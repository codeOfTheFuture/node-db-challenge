const express = require('express');

const Projects = require('./projectsModel');

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const newProject = await Projects.addProject(data);
    res.status(201).json(newProject);
  } catch (error) {
    console.log('Add new project error: ', error);
    res.status(500).json({
      message: 'Server was unable to add the new projects to db',
    });
  }
});

router.post('/:id/actions', async (req, res) => {
  const data = req.body;
  try {
    const newAction = await Projects.addAction(data);
    res.status(201).json(newAction);
  } catch (error) {
    console.log('Add new action to a project error: ', error);
    res.status(500).json({
      message: 'Server was unable to add the new action to db',
    });
  }
});

router.get('/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const project = await Projects.getProjectById(id);
    const projectActions = await Projects.getProjectActions(id);

    res.status(200).json({ ...project, actions: [projectActions] });
  } catch (error) {
    console.log('Get project by id error: ', error);
    res.status(500).json({
      message: 'Server was unable to get the project that was requested',
    });
  }
});

module.exports = router;
