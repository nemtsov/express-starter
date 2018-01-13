const { pool } = require('../../lib/core/db');

exports.dbReturns = function (criteria, rows) {
  if (arguments.length === 1) {
    rows = criteria;
    criteria = q => q;
  }
  pool.query.returns(Promise.resolve({ rows: []}));
  criteria(pool.query).returns(Promise.resolve({ rows }));
};

exports.dbRejects = function (errorCode) {
  const error = new Error('dbrejects error');
  error.code = errorCode;
  error.schema = 'sch';
  error.table = 'tbl';
  const promise = Promise.reject(error);
  promise.catch(() => {});
  pool.query.returns(promise);
};

exports.resetDbSpies = function() {
  pool.query.reset && pool.query.reset();
};