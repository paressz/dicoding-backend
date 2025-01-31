const schema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const PlaylistsValidator = {
  validatePlaylistPayload: (payload) => {
    const validatedPlaylistPayload = schema.playlistPayload.validate(payload);
    if (validatedPlaylistPayload.error) {
      throw new InvariantError(validatedPlaylistPayload.error.message);
    }
  },
  validateSongsPlaylistPayload: (payload) => {
    const validateSongsPlaylistPayload = schema.songsPlaylistPayload.validate(payload);
    if (validateSongsPlaylistPayload.error) {
      throw new InvariantError(validateSongsPlaylistPayload.error.message);
    }
  }
};

module.exports = PlaylistsValidator;