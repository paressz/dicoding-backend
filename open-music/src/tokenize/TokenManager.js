const jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
  generateAccessToken: (payload) => jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) => jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (rt) => {
    try {
      const art = jwt.token.decode(rt);
      jwt.token.verifySignature(art, process.env.REFRESH_TOKEN_KEY);
      const { payload } = art.decoded;
      return payload;
    } catch (e) {
      console.error(e);
      throw new InvariantError('Refresh Token Invalid');
    }
  },
};

module.exports = TokenManager;