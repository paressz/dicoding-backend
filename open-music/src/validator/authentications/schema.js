const Joi = require('joi');

const PostAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const refreshTokenPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = { PostAuthenticationPayloadSchema, refreshTokenPayloadSchema };
