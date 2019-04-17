const { authenticate } = require('@feathersjs/authentication').hooks;
const dauria = require('dauria');

module.exports = {
  before: {
    all: [ 
      authenticate('jwt')
       ],
    find: [],
    get: [],
    create: [
      // before-create Hook to get the file (if there is any)
      // and turn it into a datauri,
      // transparently getting feathers-blob to work 
      // with multipart file uploads
      function(hook) {
            if (!hook.data.uri && hook.params.file){
                const file = hook.params.file;
                const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
                hook.data = {
                  uri: uri,
                  id: file.originalname
                };
            }
        }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
