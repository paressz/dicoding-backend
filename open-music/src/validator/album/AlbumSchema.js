const joi = require('joi');

const AlbumSchema = joi.object({
  name: joi.string()
    .required(),
  year: joi.number().integer()
    .min(1000).required(),
});

module.exports = AlbumSchema;