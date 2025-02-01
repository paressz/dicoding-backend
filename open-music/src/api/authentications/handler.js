class AuthenticationHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;
  }

  async addRefreshTokenHandler(r, h) {
    this._validator.validatePostAuthenticationPayload(r.payload);
    const { username, password } = r.payload;
    const id = await this._usersService.verifyCredentials(username, password);
    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });
    await this._authenticationsService.addRefreshToken(refreshToken);
    const response = h.response({
      status: 'success',
      data: { accessToken, refreshToken }
    }).code(201);
    return response;
  }

  async updateAccessToken(r) {
    this._validator.validateRefreshTokenPayload(r.payload);
    const { refreshToken } = r.payload;
    await this._authenticationsService.verifyRefreshToken(refreshToken);
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = this._tokenManager.generateAccessToken({ id });
    return {
      status: 'success',
      data: { accessToken }
    };
  }
  async deleteRefreshToken(r) {
    this._validator.validateRefreshTokenPayload(r.payload);
    const { refreshToken } = r.payload;
    await this._authenticationsService.verifyRefreshToken(refreshToken);
    await this._authenticationsService.deleteRefreshToken(refreshToken);
    return {
      status: 'success',
      message: 'Refresh token has been deleted'
    };
  }
}
module.exports = AuthenticationHandler;