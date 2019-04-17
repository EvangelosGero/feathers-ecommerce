'use strict';

module.exports = function() {
    return function(hook) {
        Object.assign(hook.data, {createdAt: new Date().getTime()})
        return Promise.resolve(hook);
  };
};