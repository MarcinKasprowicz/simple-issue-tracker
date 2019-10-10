const path = require('path');
/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');

/**
 * server configuration
 */
const config = require('../config/');
const dbService = require('./services/db.service');
const auth = require('./policies/auth.policy');
const user = require('./policies/user.policy');

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = http.Server(app);
const routes = mapRoutes(config.routes, 'api/controllers/');
const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// secure your routes with jwt authentication middleware
app.all('/api/*', (req, res, next) => auth(req, res, next));

// map your token to user
app.all('/api/*', user);

// fill routes for express application
app.use('/api', routes);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

server.listen(config.port, () => {
  if (
    environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});
