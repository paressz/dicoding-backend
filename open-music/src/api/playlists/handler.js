class PlaylistsHandler {
  constructor(playlistsService, playlistSongsService, validator) {
    this._playlistsService = playlistsService;
    this._playlistsSongsService = playlistSongsService;
    this._validator = validator;
  }
  async addPlaylistHandler(r, h) {
    this._validator.validatePlaylistPayload(r.payload);
    const { name } = r.payload;
    const { id: credentialId } = r.auth.credentials;
    const plId = await this._playlistsService.addPlaylist({ name, owner: credentialId });
    const response = h.response({
      status: 'success',
      data: { playlistId: plId },
    }).code(201);
    return response;
  }
  async deletePlaylistHandler(r) {
    const { playlistId } = r.params;
    const { id: credentialId } = r.auth.credentials;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._playlistsService.deletePlaylist(playlistId);
    return { status: 'success', message: `${playlistId} deleted` };
  }

  async getPlaylistsHandler(r) {
    const { id } = r.auth.credentials;
    const playlists = await this._playlistsService.getPlaylists(id);
    return {
      status: 'success',
      data: { playlists },
    };
  }

  async addSongsToPlaylistHandler(r, h) {
    this._validator.validateSongsPlaylistPayload(r.payload);
    const { songId } = r.payload;
    const { playlistId } = r.params;
    const { id: credentialId } = r.auth.credentials;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._playlistsSongsService.addSongToPlaylist(playlistId, songId);
    const response = h.response({
      status: 'success',
      message: `${songId} added to ${playlistId}`
    }).code(201);
    return response;
  }

  async getSongFromPlaylistHandler(r) {
    const { playlistId } = r.params;
    const { id: credentialId } = r.auth.credentials;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    const playlist = await this._playlistsService.getPlaylist(playlistId);
    const songs = await this._playlistsSongsService.getSongFromPlaylist(playlistId);
    return {
      status: 'success',
      data: {
        playlist: {
          ...playlist,
          songs
        }
      },
    };
  }
  async deletSongFromPlaylistHandler(r) {
    const { playlistId } = r.params;
    const {songId} = r.payload;
    const { id: credentialId } = r.auth.credentials;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._playlistsSongsService.deleteSongFromPlaylist(songId, playlistId);
    return {
      status: 'success',
      message: `${songId} deleted from ${playlistId}`
    }
  }
}
module.exports = PlaylistsHandler;