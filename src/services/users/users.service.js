// Initializes the `users` service on path `/users`
const createService = require('feathers-mongodb');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { 
   // paginate 
  };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('users');

  mongoClient.then(db => {
    //create sparse and unique index for username and email property
   // Promise.all([
    db.collection('users').createIndex( { "username": 1 }, { unique: true, sparse: true } ),   
    db.collection('users').createIndex( { "email": 1 }, { unique: true, sparse: true } )
   // ])
    service.Model = db.collection('users');
  });

  service.hooks(hooks);
};
