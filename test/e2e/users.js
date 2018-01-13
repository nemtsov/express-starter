const { match } = require('sinon');
const { UNIQUE_VIOLATION } = require('pg-error-constants');
const createChaiRequest = require('../helpers/createChaiRequest');
const { dbReturns, dbRejects } = require('../helpers/db');
const createAccessToken = require('../helpers/createAccessToken');

describe('e2e/users', function () {
  before(async function () {
    this.req = await createChaiRequest();
  });

  describe('when creating a new user', async function() {
    it('should return a 400 if the email was not provided', async function() {
      try { await this.req.post('/users').send({ email: 'e@e.com' }); }
      catch (e) { return e.response.should.have.status(400); }
      throw new Error('should have thrown a 400');
    });

    it('should return a 400 if the password was not provided', async function() {
      try { await this.req.post('/users').send({ password: 'p' }); }
      catch (e) { return e.response.should.have.status(400); }
      throw new Error('should have thrown a 400');
    });

    it('should create a new user', async function() {
      dbReturns([ 'u2' ]);
      const res = await this.req.post('/users').send({ email: 'e@e.com', password: 'p' });
      res.should.have.status(201);
      res.should.be.json;
      JSON.parse(res.text).should.equal('u2');
    });

    it('should return a 400 if a user with the same email exists', async function() {
      dbRejects(UNIQUE_VIOLATION);
      try { await this.req.post('/users').send({ email: 'e@e.com', password: 'p' }); }
      catch (e) { return e.response.should.have.status(400); }
      throw new Error('should have thrown a 400');
    });

    it('should return a 500 for other db errors', async function() {
      dbRejects(9999999);
      try { await this.req.post('/users').send({ email: 'e@e.com', password: 'p' }); }
      catch (e) { return e.response.should.have.status(500); }
      throw new Error('should have thrown a 500');
    });
  });

  describe('when fetching a single user', function() {
    it('should return a 401 if the user is not authenticated', async function() {
      try { await this.req.get('/users/u3'); }
      catch (e) { return e.response.should.have.status(401); }
      throw new Error('should have thrown');
    });

    it('should return a 401 if the JWT.sub is not the requested user id', async function() {
      const token = await createAccessToken(this.req, 'u99');
      try { await this.req.get('/users/u2').set('Authorization', `Bearer ${token}`); }
      catch (e) { return e.response.should.have.status(401); }
      throw new Error('should have thrown 401');
    });

    it('should return a 404 if the JWT is good but no user is found', async function() {
      const token = await createAccessToken(this.req, 'u1');
      try { await this.req.get('/users/u1').set('Authorization', `Bearer ${token}`); }
      catch (e) { return e.response.should.have.status(404); }
      throw new Error('should have thrown 404');
    });

    it('should return by id if exists', async function() {
      const token = await createAccessToken(this.req, 'u99');
      const u3 = { id: 'u3' };
      dbReturns(q => q.withArgs(match.string, ['u3']), [ u3 ]);
      const res = await this.req
        .get('/users/u3')
        .set('Authorization', `Bearer ${token}`);
      res.should.have.status(200);
      res.should.be.json;
      JSON.parse(res.text).should.eql(u3);
    });
  });
});
