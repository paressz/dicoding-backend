const joi = require('joi');

const SongSchema = joi.object({
  title: joi.string().required(),
  year: joi.number().integer()
    .min(1000).required(),
  genre: joi.string().required(),
  performer: joi.string().required(),
  duration: joi.number().integer(),
  albumId: joi.string(),
});

module.exports =  SongSchema;