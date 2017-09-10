const requireDirectory = require('require-directory');

requireDirectory(module, '../lib', { exclude: /app\.js$/ })
