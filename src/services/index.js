const users = require('./users/users.service.js');
const uploads = require('./uploads/uploads.service.js');
const categories = require('./categories/categories.service.js');
const products = require('./products/products.service.js');
const orders = require('./orders/orders.service.js');
const messages = require('./messages/messages.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(uploads);
  app.configure(categories);
  app.configure(products);
  app.configure(orders);
  app.configure(messages);
};
