const createRouter = require('../core/createRouter');
const { getUserByAuth } = require('../users');
const { createToken } = require('./');

const router = module.exports = createRouter();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByAuth(email, password);
  if (!user) {
    res.status(401).json('bad email or password');
    return;
  }

  const permissions = [
    'github:read',
  ];

  res.json(await createToken(user, permissions));
});
