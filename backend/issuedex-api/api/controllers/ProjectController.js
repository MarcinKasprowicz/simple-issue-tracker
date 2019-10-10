const Project = require('../models/Project');

const ProjectController = () => {
  const create = async (req, res) => {
    try {
      const project = await Project.create({
        userId: req.user.id,
        name: req.body.name,
        description: req.body.description,
      });
      return res.status(201).json(project);
    } catch (error) {
      console.error(`Error during creating project. Reason: ${error}`);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  const getAll = async (req, res) => {
    try {
      const projects = await Project.findAll({ where: { userId: req.user.id } });
      return res.status(200).json(projects);
    } catch (error) {
      console.error(`Error during getting projects from db. Reason: ${error}`);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  const update = async (req, res) => {
    try {
      const [count] = await Project.update(
        {
          userId: req.user.id,
          name: req.body.name,
          description: req.body.description,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      );
      if (count === 0) return res.status(404).json({ msg: 'project not found' });
      const project = await Project.findByPk(req.params.id);
      return res.status(200).json(project);
    } catch (error) {
      console.error(`Error during updating project (id: ${req.params.id}). Reason: ${error}`);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  const destroy = async (req, res) => {
    try {
      const count = await Project.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (count === 0) return res.status(404).json({ msg: 'project not found' });
      return res.status(200).json({ msg: `project ${req.params.id} deleted` });
    } catch (error) {
      console.error(`Error during removing project (id: ${req.params.id}). Reason: ${error}`);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    create,
    getAll,
    update,
    destroy,
  };
};

module.exports = ProjectController;
