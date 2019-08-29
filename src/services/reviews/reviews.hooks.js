const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');
const processReview = require('../../hooks/process-review');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processReview()],
    update: [processReview()],
    patch: [processReview()],
    remove: []
  },

  after: {
    all: [
      populate({
        schema: {
          include: [{
            service: 'users',
            nameAs: 'customer',
            parentField: 'customerId',
            childField: '_id'
          }]
        }
      })
    ],
    find: [],
    get: [],
    create: [
      async context => {
        let reviews = 0;
        let rating = 0;
        const user = await context.app.service('users')
          .get(context.data.supplierId); 
        if(context.data.text || context.data.rating){
            reviews = (+user.reviews | 0) + 1;
            rating = ((+user.rating | 0) * (+user.reviews | 0) + (+context.data.rating | 0))/((+user.reviews | 0) + 1);}

            context.app.service('users')
              .patch(context.data.supplierId, 
                {
                  reviews: reviews,
                  rating: rating 
                })
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
