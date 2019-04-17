const { authenticate } = require('@feathersjs/authentication').hooks;
const createdAtHook = require('../../hooks/createdAt');
const { softDelete } = require('feathers-hooks-common');

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt'), softDelete() ],
    get: [ authenticate('jwt'), softDelete() ],
    create: [ hashPassword(), createdAtHook(), softDelete() ],
    update: [ hashPassword(),  authenticate('jwt'), softDelete() ],
    patch: [ hashPassword(),  authenticate('jwt'), softDelete() ],
    remove: [ authenticate('jwt'), softDelete() ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
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
