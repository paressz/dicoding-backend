const { nanoid } = require('nanoid');
const pool = require('./pool');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

class PlaylistSongsService {
  constructor(songsService) {
    this._songsService = songsService;
  }
  async addSongToPlaylist(plId, songId) {
    const id = `playlist-songs-${nanoid(16)}`;
    await this._songsService.getSong(songId);
    const q = {
      text: 'INSERT INTO playlist_songs VALUES ($1, $2, $3) returning id',
      values: [id, plId, songId]
    };
    const res = await pool.query(q);
    if (!res.rows.length) throw new InvariantError('Failed to add song to playlist');
  }

  async getSongFromPlaylist(plId) {
    const q = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs
            LEFT JOIN playlist_songs ON songs.id = playlist_songs.song_id
            WHERE playlist_songs.playlist_id = $1`,
      values: [plId]
    };
    const res = await pool.query(q);
    console.log(res.rows)
    if (!res.rows.length) throw new NotFoundError('Failed: invalid playlist id');
    return res.rows;
  }

  async deleteSongFromPlaylist(songId, plId) {
    const q = {
      text: 'DELETE FROM playlist_songs WHERE song_id = $1 AND playlist_id = $2 returning id',
      values: [songId, plId]
    };
    const res = await pool.query(q);
    if (!res.rows.length) throw new InvariantError(`Failed to delete song ${songId} in playlist ${plId}`);
    return res.rows[0];
  }
}
module.exports = PlaylistSongsService;