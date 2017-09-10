const proxyquire = require('proxyquire');
const should = require('should');

proxyquire.noCallThru();

describe('core', function() {
  it('should get config', function() {
    const unit = proxyquire('../lib/core/config', {});
    should.not.exist(unit.get());
  });

  it('should get logger', function() {
    const unit = proxyquire('../lib/core/loggers', {});
    const logger = unit.get();
    should.exist(logger);
  });

  it('should call init', async function() {
    const unit = proxyquire('../lib/core/init', {});
    await unit();
  });
});
