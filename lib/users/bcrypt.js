const { promisify } = require('util');
const loggers = require('../core/loggers');
const config = require('../core/config');

const logger = loggers.get('bcrypt');
const BCRYPT_ROUNDS = parseInt(config.get('BCRYPT_ROUNDS'));

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
  saltRounds: BCRYPT_ROUNDS,
};
