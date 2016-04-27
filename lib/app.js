import express from 'express';
import bodyParser from 'body-parser';
import config from './core/config';
import loggers from './core/loggers';
import init from './core/init';
import github from './github/resource';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/_health', (req, res) => res.end('ok'));
app.use('/favicon.ico', (req, res) => res.end());
app.use('/', github);

const port = config.get('PORT');
const logger = loggers.get('app');

init()
  .catch(e => {
    logger.error(e.stack);
    process.exit(1);
  })
  .then(() => {
    app.listen(port, () => {
      logger.info(`on :${port}`);
    });
  });
