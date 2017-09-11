const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('./lib/core/config');
const loggers = require('./lib/core/loggers');
const init = require('./lib/core/init');
const errorHandler = require('./lib/core/errorHandler');
const githubResource = require('./lib/github/resource');
const usersResource = require('./lib/users/resource');

const port = config.get('PORT');
const logger = loggers.get('server');
const app = express();

app.use(morgan(':date[iso] (server) INFO: :method :url :remote-addr :response-time :status', {
  skip: (req) => /^\/favicon.ico/.test(req.originalUrl),
}));

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use('/_health', (req, res) => res.end('ok'));
app.use('/favicon.ico', (req, res) => res.end());
app.use('/github', githubResource);
app.use('/users', usersResource);

app.use(errorHandler);

init()
  .catch((err) => {
    logger.error(err.stack);
    process.exit(1);
  })
  .then(() => {
    app.listen(port, () => {
      logger.info(`listening on :${port}`);
    });
  });
