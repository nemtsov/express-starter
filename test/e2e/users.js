const { match } = require('sinon');
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

  it('should create a new user', async function() {
    dbReturns([ 'u2' ]);
    const res = await this.req
      .post('/users')
      .send({ email: 'e@e.com', password: 'password' });
    res.should.have.status(201);
    res.should.be.json;
    JSON.parse(res.text).should.equal('u2');
  });

  describe('when fetching a single user', function() {
    it('should return a 404 if the user does not exist', async function() {
      dbReturns([]);
      try {
        await this.req.get('/users/u7');
      } catch (err) {
        return err.response.should.have.status(404);
      }
      throw new Error('should have returned a 404');
    });

    it('should return by id if exists', async function() {
      const u3 = { id: 'u3' };
      dbReturns(q => q.withArgs(match.string, ['u3']), [ u3 ]);
      const res = await this.req.get('/users/u3');
      res.should.have.status(200);
      res.should.be.json;
      JSON.parse(res.text).should.eql(u3);
    });
  });
});
