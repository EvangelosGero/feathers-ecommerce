'use strict';

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function() {
  return function(hook) {
    const customerId = hook.data.customerId;
    const supplierId = hook.data.supplierId;
    // The actual review text and rating
    const text = hook.data.text;
    const rating = hook.data.rating;
    if(text){
      // Reviews can't be longer than 400 characters
      text.substring(0, 400)      
      // Do some basic HTML escaping
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');    
      // Override the original data    
    hook.data = {
      text,
      rating,
      customerId,
      supplierId,
      // Add the current time via `getTime`
     // createdAt: new Date()
    }} ;
       
   

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
