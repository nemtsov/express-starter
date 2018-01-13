const { match } = require('sinon');
const { dbReturns } = require('../helpers/db');

// "password" hashed w/ bcrypt saltRounds: 1
const HASHED_PASS = '$2a$04$IFIta7yFPKTv0ZBIYLXXJObH8c1JaDDrDdI5IjzYYSCyOIOuX/5hK';

module.exports = async function createAccessToken(req, userId = 'u1') {
  const dbUser = { id: userId, password: HASHED_PASS };
  dbReturns(q => q.withArgs(match.string, ['e@e.com']), [ dbUser ]);

  const res = await req
    .post('/tokens')
    .auth('e@e.com', 'password');

  res.should.have.status(201);
  res.should.be.json;
  res.text.should.have.lengthOf.above(0);

  return JSON.parse(res.text);
}