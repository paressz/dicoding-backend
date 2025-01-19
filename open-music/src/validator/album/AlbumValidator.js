const AlbumSchema = require('./AlbumSchema');
const InvariantError = require('../../exceptions/InvariantError');

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const validatedPayload = AlbumSchema.validate(payload);
    if (validatedPayload.error) throw new InvariantError(validatedPayload.error.message);
  }
};

module.exports = AlbumValidator;