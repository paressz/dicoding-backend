const { nanoid } = require('nanoid');
const pool = require('./pool');
const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');
const bcrypt = require('bcrypt');

class UserService {
  async verifyUsername(uname) {
    const q = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [uname]
    };
    const res = await pool.query(q);
    if (res.rows.length) {
      throw new InvariantError('Failed: Username already exists');
    }
  }

  async verifyCredentials(uname, password) {
    const q = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [uname]
    };
    const res = await pool.query(q);
    if (!res.rows.length) throw new AuthenticationError('failed: Invalid credentials');
    const { id, password: hashedPassword } = res.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) throw new AuthenticationError('failed: Invalid credentials');
    return id;
  }

  async registerUser({ username, password, fullname }) {
    await this.verifyUsername(username);
    const id = `user-${nanoid(16)}`;
    const hashed = await bcrypt.hash(password, 5);
    const q = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashed, fullname]
    };
    const res = await pool.query(q);
    if (!res.rows.length) throw new InvariantError('Failed: Invalid credentials');
    return res.rows[0].id;
  }
}
module.exports = UserService;