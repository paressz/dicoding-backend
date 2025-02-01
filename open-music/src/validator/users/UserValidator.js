const schema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const UserValidator = {
  validateUserPayload: (payload) => {
    const validatedUser = schema.validate(payload);
    if (validatedUser.error) throw new InvariantError(validatedUser.error.message);
  }
};
module.exports = UserValidator;