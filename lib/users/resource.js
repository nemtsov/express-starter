const createError = require('http-errors');
const createRouter = require('../core/createRouter');
const { ensureAuth } = require('../tokens');
const {
  fetchUser,
  createUser,
} = require('./');

const router = module.exports = createRouter();

router.post('/', async (req, res, next) => {
  if (!/.+@.+\..+/.test(req.body.email) || !(req.body.password && /.+/.test(req.body.password))) {
    return next(createError(400, 'Email and password are required'));
  }
  res.status(201).json(
    await createUser(req.body.email, req.body.password)
  );
});

router.get('/:id', ensureAuth(), async (req, res, next) => {
  if (req.user.sub !== req.params.id) next(createError(401));
  const user = await fetchUser(req.params.id);
  user ? res.json(user) : next(createError(404));
});
