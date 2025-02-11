const schema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const UploadValidator = {
  validateImageHeader: (headers) => {
    const res = schema.validate(headers);
    if (res.error) throw new InvariantError(res.error.message);
  },
};

module.exports = UploadValidator;