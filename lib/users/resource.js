const createError = require('http-errors');
const createRouter = require('../core/createRouter');
const {
  fetchUsers,
  fetchUser,
  createUser,
} = require('./');

const router = module.exports = createRouter();

router.get('/', async (req, res) => {
  res.json(await fetchUsers());
});

router.post('/', async (req, res) => {
  res.status(201).json(
    await createUser(req.body.email, req.body.password)
  );
});

router.get('/:id', async (req, res, next) => {
  const user = await fetchUser(req.params.id);
  user ? res.json(user) : next(createError(404));
});
