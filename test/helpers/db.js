const { pool } = require('../../lib/core/db');

exports.dbReturns = function (criteria, data) {
  if (arguments.length === 1) {
    data = criteria;
    criteria = q => q;
  }
  pool.query.returns(Promise.resolve({ rows: []}));
  criteria(pool.query).returns(Promise.resolve({ rows: [ data ]}));
};

exports.resetDbSpies = function() {
  pool.query.reset();
};