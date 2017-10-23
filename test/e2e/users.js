const createChaiRequest = require('../helpers/createChaiRequest');
const { dbReturns, resetDbSpies } = require('../helpers/db');

describe('e2e/users', function () {
  before(async function () {
    this.req = await createChaiRequest();
  });

  afterEach(resetDbSpies);

  it('should get all users', async function() {
    const u1 = { id: 'u1' };
    dbReturns([ u1 ]);
    const res = await this.req.get('/users');
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.text).should.eql([ u1 ]);
  });
});
