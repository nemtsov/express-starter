const createChaiRequest = require('../helpers/createChaiRequest');

describe('e2e/core', function () {
  before(async function () {
    this.req = await createChaiRequest();
  });

  it('should respond to /_health', async function() {
    const res = await this.req.get('/_health');
    res.should.have.status(200);
    res.text.should.equal('ok');
  });

  it('should respond to /favicon.ico', async function() {
    const res = await this.req.get('/favicon.ico');
    res.should.have.status(200);
    res.text.should.equal('');
  });
});
