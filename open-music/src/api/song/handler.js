class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this.validator = validator;
  }

  async getAllSongs(r, h) {
    this.validator.validateSongPayload(r.payload);
    const songs = await this._service.getAllSongs(r.query);
    const response = h.response({
      status: 'success',
      data: { songs }
    }).code(200);
    return response;
  }
  async getSong(r, h) {
    this.validator.validateSongPayload(r.payload);
    const { id } = r.params;
    const song = await this._service.getSong(id);
    const res = h.response({
      status: 'success',
      data: { song }
    });
    return res;
  }
  async insertSong(r, h) {
    this.validator.validateSongPayload(r.payload);
    const songId = await this._service.addSong(r.payload);
    const res = h.response({
      status: 'success',
      data: { songId: songId },
    }).code(201);
    return res;
  }

  async updateSong(r) {
    this.validator.validateSongPayload(r.payload);
    const { id } = r.params;
    await this._service.updateSong(id, r.payload);
    return {
      status: 'success',
      message: `Update song: ${id}`
    };
  }

  async deleteSong(r) {
    const { id } = r.params;
    await this._service.deleteSong(id);
    return {
      status: 'success',
      message: `Delete song: ${id}`,
    };
  }
}

module.exports = SongHandler;