const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const createJwtMid = require('express-jwt');
const createJwtAuthzMid = require('express-jwt-authz');
const config = require('../core/config');

const JWT_PRIVATE_KEY = config.get('JWT_PRIVATE_KEY');
const JWT_PUBLIC_KEY = config.get('JWT_PUBLIC_KEY');
const JWT_ISSUER = config.get('JWT_ISSUER');
const JWT_AUDIENCE = JWT_ISSUER;

const jwtSign = promisify(jwt.sign);

function getJwtUserData(user) {
  const blacklist = ['id', 'password'];
  return Object.keys(user).reduce((jwtUser, field) => {
    if (blacklist.indexOf(field) === -1 && user[field] && user[field] !== null) {
      jwtUser[field] = user[field];
    }
    return jwtUser;
  }, {})
}

exports.createToken = function(user, permissions) {
  const claims = {
    scope: permissions.join(' '),
    ...getJwtUserData(user),
  };

  const options = {
    subject: user.id,
    algorithm: 'RS256',
    expiresIn: '10h',
    audience: JWT_AUDIENCE,
    issuer: JWT_ISSUER,
  };

  return jwtSign(claims, JWT_PRIVATE_KEY, options);
};

exports.ensureAuth = function(permissions) {
  const mids = [createJwtMid({
    algorithms: ['RS256'],
    secret: JWT_PUBLIC_KEY,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
  })];
  permissions && mids.push(createJwtAuthzMid(permissions));
  return mids;
};
