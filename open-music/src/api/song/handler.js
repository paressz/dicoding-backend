class SongHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
  }

  async getAllSongs(r, h) {
    this.validator.validateSongPayload(r.payload);
    const { title, perfomer } = r.params;
    const songs = await this.service.getAllSongs({ title, perfomer });
  }
  async getSong() {

  }
  async insertSong() {

  }
  async updateSong() {

  }
  async deleteSong() {

  }
}