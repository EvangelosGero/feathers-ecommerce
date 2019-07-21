// Initializes the `wishlist` service on path `/wishlist`
const createService = require('feathers-mongodb');
const hooks = require('./wishlist.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = {  };

  // Initialize our service with any options it requires
  app.use('/wishlist', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('wishlist');

  mongoClient.then(db => {
    service.Model = db.collection('wishlist');
  });

  service.hooks(hooks);
};
