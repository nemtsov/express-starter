const { pool } = require('../core/db');
const bc = require('../core/bcrypt');

exports.fetchUser = async function (userId) {
  return (await pool.query(`
    SELECT id, email FROM users
    WHERE id = $1
  `, [userId])).rows[0];
};

exports.createUser = async function(email, plaintextPassword) {
  const hashedPassword = await bc.hash(plaintextPassword, bc.saltRounds);
  return (await pool.query(`
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id
  `, [email, hashedPassword])).rows[0];
};

exports.isPasswordValid = async function(userId, plaintextPassword) {
  const hashedPassword = (await pool.query(`
    SELECT password FROM users
    WHERE id = $1
  `, [userId])).rows[0];
  return await bc.compare(plaintextPassword, hashedPassword);
};

exports.fetchUsers = async function (limit = 10, offset = 0) {
  return (await pool.query(`
    SELECT id, email FROM users
    LIMIT $1 OFFSET $2
  `, [limit, offset])).rows;
};
