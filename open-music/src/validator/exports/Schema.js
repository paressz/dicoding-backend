const joi = require('joi');

module.exports = joi.object({
  targetEmail: joi
    .string()
    .email({ tlds: true })
    .required(),
});