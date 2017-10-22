const { stub } = require('sinon')

module.exports = function createHttpStubs() {
  function n() {}
  const req = { method: 'GET' };
  const res = stub({ status: n, json: n, end: n });
  res.status.returns(res);
  return { req, res };
};