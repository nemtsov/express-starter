const { Pool } = require('pg');
const config = require('./config');

/* istanbul ignore else */
if (config.get('NODE_ENV') === 'test') {
  module.exports = require('../../test/helpers/createCoreStubs')().stubs.db;
  return;
}

/* istanbul ignore next */
exports.pool = new Pool({
  connectionString: config.get('DATABASE_URL'),
});
