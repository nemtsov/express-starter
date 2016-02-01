import {Router} from 'express';
import wrap from 'express-async-wrap';
import loggers from '../core/loggers';
import {getRepoNames} from './';

const logger = loggers.get('github/resource');

const router = new Router();
export default router;

router.get('/:username', wrap(async({params: {username}}, res, next) => {
  logger.info('get repository names by username:', username);
  res.json(await getRepoNames(username));
}));
