const schema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const AuthenticationValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const result = schema.PostAuthenticationPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
  validateRefreshTokenPayload: (payload) => {
    const result = schema.refreshTokenPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

module.exports = AuthenticationValidator;