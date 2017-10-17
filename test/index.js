const requireDirectory = require('require-directory');

const ENV_VARS = {
  JWT_PRIVATE_KEY: 'jwt_priv_key',
  JWT_PUBLIC_KEY: 'jwt_pub_key',
};

Object.keys(ENV_VARS).forEach(key => process.env[key] = ENV_VARS[key]);

requireDirectory(module, '../lib', { exclude: /app\.js$/ })
