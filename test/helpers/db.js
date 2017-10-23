const { pool } = require('../../lib/core/db');

exports.dbReturns = function (criteria, rows) {
  if (arguments.length === 1) {
    rows = criteria;
    criteria = q => q;
  }
  pool.query.returns(Promise.resolve({ rows: []}));
  criteria(pool.query).returns(Promise.resolve({ rows }));
};

exports.resetDbSpies = function() {
  pool.query.reset();
};