import {sandbox as sinonSandbox} from 'sinon';
import config from '../../lib/core/config';
import loggers from '../../lib/core/loggers';

let sandbox, stubs;

export default function createCoreStubs() {
  if (sandbox) {
    sandbox.reset();
    return {sandbox, stubs};
  }

  sandbox = sinonSandbox.create();
  stubs = {
    config: sandbox.stub(config),
    loggers: sandbox.stub(loggers)
  };

  function n() {}

  stubs.loggers.get.returns(
    sandbox.stub({error: n, warn: n, info: n}));

  return {sandbox, stubs};
}
