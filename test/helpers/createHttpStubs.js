const { stub } = require('sinon')

module.exports = function createHttpStubs() {
  const req = { method: 'GET' };
  const res = { status: stub(), json: stub() };
  res.status.returns(res);
  return { req, res };
};