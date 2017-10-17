const proxyquire = require('proxyquire');
const should = require('should');
const createHttpStubs = require('./helpers/createHttpStubs');

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

  describe('errorHandler', function() {
    beforeEach(function() {
      this.unit = proxyquire('../lib/core/errorHandler', {});
      this.stubs = createHttpStubs();
    });

    it('should return 400 on 22* and 23* errors', function() {
      const err = { code: 2200, schema: 's', table: 't', message: 'm1' };
      const { req, res } = this.stubs;
      this.unit(err, req, res);
      res.status.calledWith(400);
      res.json.calledWith('m1');
    });

    it('should call next() when not a pg error', function(done) {
      const err = { code: 9040 };
      this.unit(err, {}, {}, (err) => {
        err.code.should.equal(9040);
        done();
      });
    });
  });
});
