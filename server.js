const config = require('./lib/core/config');
const loggers = require('./lib/core/loggers');
const createApp = require('./lib/core/createApp');

const port = config.get('PORT');
const logger = loggers.get('server');

createApp().catch((err) => {
  logger.error(err.stack);
  process.exit(1);
})
.then((app) => {
  app.listen(port, () => {
    logger.info(`listening on :${port}`);
  });
});
