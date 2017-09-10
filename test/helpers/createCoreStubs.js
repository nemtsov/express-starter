const { sandbox: sinonSandbox } = require('sinon');
const config = require('../../lib/core/config');
const loggers = require('../../lib/core/loggers');

let sandbox;

module.exports = function createCoreStubs() {
  if (sandbox) {
    sandbox.restore();
  } else {
    sandbox = sinonSandbox.create();
  }

  const stubs = {
    config: sandbox.stub(config),
    loggers: sandbox.stub(loggers)
  };

  function n() {}

  stubs.loggers.get.returns(
    sandbox.stub({error: n, warn: n, info: n}));

  return { sandbox, stubs };
};
