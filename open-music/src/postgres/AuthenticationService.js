const pool = require('./pool');
const InvariantError = require('../exceptions/InvariantError');

class AuthenticationService {
  async addRefreshToken(refreshToken) {
    const q = {
      text: 'INSERT INTO auths VALUES ($1)',
      values: [refreshToken]
    };
    await pool.query(q);
  }
  async verifyRefreshToken(refreshToken) {
    const q = {
      text: 'SELECT * FROM auths WHERE token = $1',
      values: [refreshToken]
    };
    const res = await pool.query(q);
    if (!res.rows.length) throw new InvariantError('Invalid refresh token');
  }
  async deleteRefreshToken(refreshToken) {
    await this.verifyRefreshToken(refreshToken);
    const q = {
      text: 'DELETE FROM auths WHERE token = $1',
      values: [refreshToken]
    };
    await pool.query(q);
  }
}
module.exports = AuthenticationService;