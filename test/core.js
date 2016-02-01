import proxyquire from 'proxyquire';
import should from 'should';

proxyquire.noCallThru();

describe('core', () => {
  it('should get config', () => {
    const unit = proxyquire('../lib/core/config', {});
    should.not.exist(unit.get());
  });

  it('should get logger', () => {
    const unit = proxyquire('../lib/core/loggers', {});
    const logger = unit.get();
    should.exist(logger);
  });

  it('should call init', async () => {
    const unit = proxyquire('../lib/core/init', {});
    await unit();
  });
});
