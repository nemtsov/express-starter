import {get} from 'axios';
import config from '../core/config';

const GITHUB_API_URL = config.get('GITHUB_API_URL');
const commonProps = {
  headers: {'User-Agent': 'Babel Express Starter App'}
};

export async function getRepoNames(username) {
  const url = `${GITHUB_API_URL}/users/${username}/repos`;
  const res = await get(url, commonProps);
  return res.data.map(repo => repo.name);
}
