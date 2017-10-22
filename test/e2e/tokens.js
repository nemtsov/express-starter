const chai = require('chai');
const { match } = require('sinon');
const { dbReturns, resetDbSpies } = require('../helpers/db');
const createApp = require('../../lib/core/createApp');

// "password" hashed w/ bcrypt saltRounds: 1
const HASHED_PASS = '$2a$04$IFIta7yFPKTv0ZBIYLXXJObH8c1JaDDrDdI5IjzYYSCyOIOuX/5hK';
const getJwtPayload = (str) => JSON.parse(Buffer.from(str.split('.')[1], 'base64').toString());

describe('e2e/tokens', function () {
  before(async function () {
    this.req = chai.request(await createApp());
  });

  afterEach(resetDbSpies);

  it('should return a 401 if the user is not found', async function() {
    dbReturns(null);

    try {
      await this.req.post('/tokens');
    } catch (err) {
      err.response.should.have.status(401);
      return;
    }

    throw new Error('should have thrown a 401');
  });

  it('should create a new token', async function() {
    const user = { id: 'u1', password: HASHED_PASS, age: 21 };

    dbReturns(q => q.withArgs(match.string, ['e@e.com']), user);

    const res = await this.req
      .post('/tokens')
      .send({
        email: 'e@e.com',
        password: 'password'
      });

    res.should.have.status(201);
    res.should.be.json;
    res.text.should.have.lengthOf.above(0);

    const payload = getJwtPayload(res.text);

    payload.should.not.have.any.keys(['password']);
    payload.should.include({
      sub: user.id,
      age: 21,
    });
  });
});
