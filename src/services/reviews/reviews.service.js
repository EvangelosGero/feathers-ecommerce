// Initializes the `reviews` service on path `/reviews`
const createService = require('feathers-mongodb');
const hooks = require('./reviews.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = {  };

  // Initialize our service with any options it requires
  app.use('/reviews', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('reviews');

  mongoClient.then(db => {
    db.collection('reviews').dropIndex( { "createdAt" : 1 } )    
    db.collection('reviews').createIndex( { "createdAt": 1 }, { expireAfterSeconds: 12592000 } );
    service.Model = db.collection('reviews');
  });

  service.hooks(hooks);
};
