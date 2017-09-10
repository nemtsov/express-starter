const proxyquire = require('proxyquire');
const { stub } = require('sinon');
const createCoreStubs = require('../helpers/createCoreStubs');

proxyquire.noCallThru();

describe('github', function() {
  beforeEach(function() {
    const { stubs } = createCoreStubs();
    this.axios = { get: stub() };
    this.unit = proxyquire('../../lib/github', {
      'axios': this.axios,
      '../core/config': stubs.config,
    })
  });

  it('should get GH repo names', async function() {
    this.axios.get.returns(Promise.resolve({ data: [{ name: 'a' }, { name: 'b' }] }));
    const names = await this.unit.getRepoNames();
    names.should.eql(['a', 'b']);
  });
});
