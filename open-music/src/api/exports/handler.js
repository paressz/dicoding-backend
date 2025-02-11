class ExportsHandler {
  constructor(producerService, playlistsService, validator) {
    this.producerService = producerService;
    this.playlistsService = playlistsService;
    this.validator = validator;
  }

  async postToExportPlaylistsHandler(r, h) {
    this.validator.validateExportPlaylistPayload(r.payload);
    const { id: credentialId } = r.auth.credentials;
    const playlistId = r.params.playlistId;
    await this.playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    const { targetEmail } = r.payload;
    const message = { playlistId, targetEmail };
    await this.producerService.sendMessage('export:playlists', JSON.stringify(message));
    const response = h.response({ status: 'success', message: 'Export in progress' }).code(201);
    return response;
  }
}

module.exports = ExportsHandler;