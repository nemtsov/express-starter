import proxyquire from 'proxyquire';
import {stub} from 'sinon';
import should from 'should';
import createCoreStubs from '../helpers/createCoreStubs';

proxyquire.noCallThru();

describe('github', () => {
  let unit, request;

  beforeEach(() => {
    const {stubs} = createCoreStubs();
    request = {get: stub()};
    unit = proxyquire('../../lib/github', {
      'request-promise': request,
      '../core/config': stubs.config
    })
  });

  it('should get GH repo names', async () => {
    request.get.returns(Promise.resolve([{name: 'a'}, {name: 'b'}]));
    const names = await unit.getRepoNames();
    names.should.eql(['a', 'b']);
  });
});
