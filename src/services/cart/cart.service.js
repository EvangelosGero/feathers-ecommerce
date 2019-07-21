// Initializes the `cart` service on path `/cart`
const createService = require('feathers-mongodb');
const hooks = require('./cart.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = {  };

  // Initialize our service with any options it requires
  app.use('/cart', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('cart');

  mongoClient.then(db => {
    service.Model = db.collection('cart');
  });

  service.hooks(hooks);
};
