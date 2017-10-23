const { sandbox: sinonSandbox } = require('sinon');

let sandbox;

module.exports = function createCoreStubs() {
  if (sandbox) {
    sandbox.restore();
  } else {
    sandbox = sinonSandbox.create();
  }

  function n() {}

  const stubs = {
    config: sandbox.stub({ get: n }),
    db: {
      pool: sandbox.stub({ connect: n, end: n, query: n, on: n }),
    },
    loggers: sandbox.stub({ get: n })
  };

  stubs.loggers.get.returns(
    sandbox.stub({error: n, warn: n, info: n}));

  return { sandbox, stubs };
};
