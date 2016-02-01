import proxyquire from 'proxyquire';
import {stub} from 'sinon';
import createCoreStubs from '../helpers/createCoreStubs';

proxyquire.noCallThru();

describe('github/resource', () => {
  let unit, service, req, res;
  beforeEach(() => {
    service = {getRepoNames: stub()};
    req = {method: 'GET'};
    res = {};
    const {stubs} = createCoreStubs();
    unit = proxyquire('../../lib/github/resource', {
      '../core/loggers': stubs.loggers,
      './': service
    })
  });

  it('should get GH repo names', done => {
    service.getRepoNames.withArgs('n')
      .returns(Promise.resolve(['a', 'b']));

    req.url = '/n';
    res.json = (data) => {
      data.should.eql(['a', 'b']);
      done();
    };

    unit(req, res, done);
  });
});
