const routes = require('./routes');

const config = {
  migrate: true,
  routes,
  port: process.env.PORT || '8080',
};

module.exports = config;
