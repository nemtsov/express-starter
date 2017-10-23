const credsFromBasicAuth = require('basic-auth');
const createError = require('http-errors');
const createRouter = require('../core/createRouter');
const { getUserByAuth } = require('../users');
const { createToken } = require('./');

const router = module.exports = createRouter();

router.post('/', async (req, res, next) => {
  const creds = credsFromBasicAuth(req);

  if (!creds) {
    return next(createError(400, 'must use basic auth'));
  }

  const user = await getUserByAuth(creds.name, creds.pass);
  if (!user) {
    return next(createError(401, 'bas user or password'));
  }

  const permissions = [
    'github:read',
  ];

  res.status(201).json(await createToken(user, permissions));
});
