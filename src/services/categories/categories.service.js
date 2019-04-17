// Initializes the `categories` service on path `/categories`
const createService = require('feathers-mongodb');
const hooks = require('./categories.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/categories', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('categories');

  mongoClient.then(db => {
    service.Model = db.collection('categories');
  });

  service.hooks(hooks);
};
