// Initializes the `uploads` service on path `/uploads`
const createService = require('./uploads.class.js');
const hooks = require('./uploads.hooks');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');


  // feathers-blob service
  const blobService = require('feathers-blob');
  // Here we initialize a FileSystem storage,
  // but you can use feathers-blob with any other
  // storage service like AWS or Google Drive.
  const fs = require('fs-blob-store');
  //remember appRoot is registered in the global object in app.js
  const blobStorage = fs(appRoot + '/../public/images');
  //multer for multipart/form-data
  const multer = require('multer');
  const multipartMiddleware = multer();

  const options = {
    name: 'uploads'
   //, paginate
  };


  app.use('/uploads', 
          multipartMiddleware.single('uri'),          
          function(req,res,next){
            req.feathers.file = req.file;
            next();
          } 
          ,blobService({Model: blobStorage}));


  // Initialize our service with any options it requires
  // app.use('/uploads',   
  //         createService(options)
  //        );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('uploads');

  service.hooks(hooks);
};
