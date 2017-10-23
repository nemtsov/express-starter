const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const init = require('./init');
const errorHandler = require('./errorHandler');
const config = require('./config');
const githubResource = require('../github/resource');
const usersResource = require('../users/resource');
const tokensResource = require('../tokens/resource');

module.exports = function createApp() {
  return new Promise((resolve, reject) => {
    const app = express();

    /* istanbul ignore if */
    if (config.get('NODE_ENV') !== 'test') {
      app.use(morgan(':date[iso] (server) INFO: :method :url :remote-addr :response-time :status', {
        skip: (req) => /^\/favicon.ico/.test(req.originalUrl),
      }));
    }

    app.use(cors());
    app.use(bodyParser.json({ limit: '10mb' }));
    app.get('/_health', (req, res) => res.end('ok'));
    app.get('/favicon.ico', (req, res) => res.end());
    app.use('/github', githubResource);
    app.use('/users', usersResource);
    app.use('/tokens', tokensResource);

    app.use(errorHandler);

    init().catch(reject).then(() => resolve(app));
  });
};
