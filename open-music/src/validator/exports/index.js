const schema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ExportValidator = {
  validateExportPlaylistPayload: (payload) => {
    const result = schema.validate(payload);
    if (result.error) throw new InvariantError(result.error.message);
  }
};
module.exports = ExportValidator;