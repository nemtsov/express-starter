const proxyquire = require('proxyquire');
const { stub } = require('sinon');
const createCoreStubs = require('../helpers/createCoreStubs');

proxyquire.noCallThru();

describe('github/resource', function() {
  beforeEach(function() {
    this.tokens = { ensureAuth: stub() };
    this.tokens.ensureAuth.returns((req, res, next) => next());

    this.service = { getRepoNames: stub() };
    this.req = { method: 'GET' };
    this.res = {};

    const { stubs } = createCoreStubs();
    this.unit = proxyquire('../../lib/github/resource', {
      '../core/loggers': stubs.loggers,
      '../tokens': this.tokens,
      './': this.service,
    })
  });

  it('should get GH repo names', function(done) {
    this.service.getRepoNames.withArgs('n')
      .returns(Promise.resolve(['a', 'b']));

    this.req.url = '/n';
    this.res.json = (data) => {
      data.should.eql(['a', 'b']);
      done();
    };

    this.unit(this.req, this.res, done);
  });
});
