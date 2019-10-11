const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const Issue = sequelize.define('issue', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.ENUM('OPEN', 'PENDING', 'CLOSED'),
    allowNull: false,
  },
});

module.exports = Issue;

