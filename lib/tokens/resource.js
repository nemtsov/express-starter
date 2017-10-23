const credsFromBasicAuth = require('basic-auth');
const createRouter = require('../core/createRouter');
const { getUserByAuth } = require('../users');
const { createToken } = require('./');

const router = module.exports = createRouter();

router.post('/', async (req, res) => {
  const creds = credsFromBasicAuth(req);

  if (!creds) {
    res.status(400).json('must use basic auth');
    return;
  }

  const user = await getUserByAuth(creds.name, creds.pass);
  if (!user) {
    res.status(401).json('bad user or password');
    return;
  }

  const permissions = [
    'github:read',
  ];

  res.status(201).json(await createToken(user, permissions));
});
