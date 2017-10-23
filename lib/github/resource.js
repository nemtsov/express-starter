const createRouter = require('../core/createRouter');
const loggers = require('../core/loggers');
const { ensureAuth } = require('../tokens');
const { getRepoNames } = require('./');

const logger = loggers.get('github/resource');
const router = module.exports = createRouter();

router.get('/:username',
    ensureAuth(['github:read']),
    async ({ params: { username } }, res) => {
  logger.info('get repository names by username:', username);

  res.json(await getRepoNames(username));
});
