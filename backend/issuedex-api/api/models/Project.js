const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Issue = require('./Issue');

const Project = sequelize.define('project', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Project.hasMany(Issue);

module.exports = Project;
