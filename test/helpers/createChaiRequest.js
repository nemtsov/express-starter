const chai = require('chai');
const createApp = require('../../lib/core/createApp');

module.exports = async function createChaiRequest() {
  return chai.request(await createApp());
};