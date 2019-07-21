const { authenticate } = require('@feathersjs/authentication').hooks;
const { discard , iff, isProvider } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [ 
       authenticate('jwt') 
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      
    ],
    get: [
      
    ],
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
