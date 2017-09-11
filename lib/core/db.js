const { Pool } = require('pg');
const config = require('./config');

exports.pool = new Pool({
  connectionString: config.get('DATABASE_URL'),
});
