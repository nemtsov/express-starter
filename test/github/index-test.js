import proxyquire from 'proxyquire';
import {stub} from 'sinon';
import should from 'should';
import createCoreStubs from '../helpers/createCoreStubs';

proxyquire.noCallThru();

describe('github', () => {
  let unit, axios;

  beforeEach(() => {
    const {stubs} = createCoreStubs();
    axios = {get: stub()};
    unit = proxyquire('../../lib/github', {
      'axios': axios,
      '../core/config': stubs.config
    })
  });

  it('should get GH repo names', async () => {
    axios.get.returns(Promise.resolve({data: [{name: 'a'}, {name: 'b'}]}));
    const names = await unit.getRepoNames();
    names.should.eql(['a', 'b']);
  });
});
