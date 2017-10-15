const { promisify } = require('util');
const loggers = require('../core/loggers');

const logger = loggers.get('bcrypt');

let bcrypt;
try {
  bcrypt = require('bcrypt');
} catch (e) {
  logger.warn('using "bcryptjs" as "bcrypt" failed to load');
  bcrypt = require('bcryptjs');
}

module.exports = {
  hash: promisify(bcrypt.hash),
  compare: promisify(bcrypt.compare),
  saltRounds: 12,
};
