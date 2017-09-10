const { Router } = require('express');
const asyncify = require('express-asyncify');

module.exports = function() {
  return asyncify(Router());
};
