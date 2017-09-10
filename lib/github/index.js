const { get } = require('axios');
const config  = require('../core/config');

const GITHUB_API_URL = config.get('GITHUB_API_URL');
const commonProps = {
  headers: { 'User-Agent': 'Babel Express Starter App' },
};

exports.getRepoNames = async function getRepoNames(username) {
  const url = `${GITHUB_API_URL}/users/${username}/repos`;
  const res = await get(url, commonProps);
  return res.data.map(repo => repo.name);
}
