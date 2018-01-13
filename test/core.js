const proxyquire = require('proxyquire');
const should = require('chai').should();
const config = require('../lib/core/config');
const loggers = require('../lib/core/loggers');
const init = require('../lib/core/init');
const errorHandler = require('../lib/core/errorHandler');
const createHttpStubs = require('./helpers/createHttpStubs');
const { resetDbSpies } = require('./helpers/db');

// globally reset the db spies
afterEach(resetDbSpies);

proxyquire.noCallThru();

describe('core', function() {
  it('should get config', function() {
    should.not.exist(config.get());
  });

  it('should get logger', function() {
    const logger = loggers.get();
    should.exist(logger);
  });

  it('should call init', async function() {
    await init();
  });

  describe('errorHandler', function() {
    beforeEach(function() {
      this.stubs = createHttpStubs();
    });

    it('should return 400 on 22* and 23* errors', function() {
      const err = { code: 2200, schema: 's', table: 't', message: 'm1' };
      const { req, res } = this.stubs;
      errorHandler(err, req, res);
      res.status.should.have.been.calledWith(400);
      res.json.should.have.been.calledWith('m1');
    });

    it('should call next() when not a pg error', function() {
      const err = { code: 9040, stack: 'st' };
      const { req, res } = this.stubs;
      errorHandler(err, req, res);
      res.status.should.have.been.calledWith(500);
      res.end.should.have.been.calledWith('st');
    });
  });
});
