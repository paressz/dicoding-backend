const Joi = require('joi');

const songsPlaylistPayload = Joi.object({
  songId: Joi.string().required(),
});

const playlistPayload = Joi.object({
  name: Joi.string().required(),
});

const schema = { songsPlaylistPayload, playlistPayload };

module.exports = schema;