const SongSchema = require('./SongSchema');
const InvariantError = require('../../exceptions/InvariantError');

const SongValidator = {
  validateSongPayload: (payload) => {
    const validatedPayload = SongSchema.validate(payload);
    if (!validatedPayload.error) throw new InvariantError(validatedPayload.error.message);
  }
};

module.exports = SongValidator;