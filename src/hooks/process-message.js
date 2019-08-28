'use strict';

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function() {
  return function(hook) {
    const senderId = hook.data.senderId;
    const receiverId = hook.data.receiverId;
    // The actual message text
    const text = hook.data.text;
    if(text){
      // Messages can't be longer than 400 characters
      text.substring(0, 400)      
      // Do some basic HTML escaping
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');    
      // Override the original data    
    hook.data = {
      text,
      senderId,
      receiverId,
      // Add the current time via `getTime`
      createdAt: new Date()
    }} ;
       
   

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
