class UserHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }
  async registerUserHandler(r, h) {
    const credentials = r.payload;
    this._validator.validateUserPayload(credentials);
    const userId = await this._service.registerUser(credentials);
    const response = h.response({
      status: 'success',
      data: { userId },
    }).code(201);
    return response;
  }
}
module.exports = UserHandler;