const publicRoutes = {
  'GET /projects': 'ProjectController.getAll',
  'POST /projects': 'ProjectController.create',
  'PUT /projects/:id': 'ProjectController.update',
  'DELETE /projects/:id': 'ProjectController.destroy',
  'GET /projects/:projectId/issues': 'IssueController.getAll',
  'POST /projects/:projectId/issues': 'IssueController.create',
  'PUT /projects/:projectId/issues/:id': 'IssueController.update',
  'DELETE /projects/:projectId/issues/:id': 'IssueController.destroy',
};

module.exports = publicRoutes;
