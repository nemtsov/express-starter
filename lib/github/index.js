import {get} from 'request-promise';
import config from '../core/config';

const GITHUB_API_URL = config.get('GITHUB_API_URL');
const commonProps = {
  json: true,
  headers: {'User-Agent': 'Babel Express Starter App'}
};

export async function getRepoNames(username) {
  const url = `${GITHUB_API_URL}/users/${username}/repos`;
  const repos = await get({url, ...commonProps});
  return repos.map(repo => repo.name);
}
