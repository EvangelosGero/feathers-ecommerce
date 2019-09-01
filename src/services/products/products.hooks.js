const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');
const createdAtHook = require('../../hooks/createdAt');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [createdAtHook()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      populate({
        schema: {
          include: [{
            service: 'users',
            nameAs: 'supplier',
            parentField: 'supplierId',
            childField: '_id'
          }]
        }
      })
    ],
    find: [],
    get: [],
    create: [],
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
