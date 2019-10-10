const Issue = require('../models/Issue');
const Sequelize = require('sequelize');

const IssueController = () => {
  const create = async (req, res) => {
    try {
      const issue = await Issue.create({
        userId: req.user.id,
        projectId: req.params.projectId,
        title: req.body.title,
        description: req.body.description,
        state: 'OPEN',
      });
      return res.status(201).json(issue);
    } catch (error) {
      if (error instanceof Sequelize.SequelizeForeignKeyConstraintError) {
        return res.status(404).json({ msg: 'project not found' });
      }
      console.error(`Error during creating issue. Reason: ${error}`);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  const getAll = async (req, res) => {
    try {
      const issues = await Issue.findAll({
        where: { projectId: req.params.projectId },
      });
      return res.status(200).json(issues);
    } catch (error) {
      console.error(`Error during getting issues from db. Reason: ${error}`);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  const update = async (req, res) => {
    try {
      const [count] = await Issue.update(
        {
          userId: req.user.id,
          projectId: req.params.projectId,
          title: req.body.title,
          description: req.body.description,
          state: req.body.state,
        },
        {
          where: {
            id: req.params.id,
            projectId: req.params.projectId,
          },
        },
      );
      if (count === 0) return res.status(404).json({ msg: 'issue not found' });
      const issue = await Issue.findByPk(req.params.id);
      return res.status(200).json(issue);
    } catch (error) {
      console.error(`Error during updating issue (id: ${req.params.id}). Reason: ${error}`);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  const destroy = async (req, res) => {
    try {
      const count = await Issue.destroy({
        where: {
          id: req.params.id,
          projectId: req.params.projectId,
        },
      });
      if (count === 0) return res.status(404).json({ msg: 'issue not found' });
      return res.status(200).json({ msg: `issue ${req.params.id} deleted` });
    } catch (error) {
      if (error instanceof Sequelize.SequelizeForeignKeyConstraintError) {
        return res.status(404).json({ msg: 'project not found' });
      }
      console.error(`Error during removing issue (id: ${req.params.id}). Reason: ${error}`);
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

module.exports = IssueController;
