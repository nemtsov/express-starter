const { UNIQUE_VIOLATION } = require('pg-error-constants');
const { pool } = require('../core/db');
const bc = require('./bcrypt');

exports.createUser = async function(email, plaintextPassword) {
  const hashedPassword = await bc.hash(plaintextPassword, bc.saltRounds);
  try {
    return (await pool.query(`
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id
    `, [email, hashedPassword])).rows[0];
  } catch (e) {
    if (e.code === UNIQUE_VIOLATION) {
      e.message = 'User with this email already exists';
    }
    throw e;
  }
};

exports.getUserByAuth = async function(email, plaintextPassword) {
  const user = (await pool.query(`
    SELECT * FROM users
    WHERE email = $1
  `, [email])).rows[0];
  if (!user) {
    return null;
  }

  const isValidPass = await bc.compare(plaintextPassword, user.password);
  if (!isValidPass) {
    return null;
  }

  return user;
};

exports.fetchUser = async function (userId) {
  return (await pool.query(`
    SELECT id, email FROM users
    WHERE id = $1
  `, [userId])).rows[0];
};
