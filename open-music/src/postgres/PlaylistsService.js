const { nanoid } = require('nanoid');
const pool = require('./pool');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const AuthorizationError = require('../exceptions/AuthorizationError');

class PlaylistsService {
  async addPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const q = {
      text: 'INSERT INTO playlists VALUES ($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };
    const result = await pool.query(q);
    if (!result.rows.length) throw new InvariantError();
    return result.rows[0].id;
  }
  async getPlaylists(owner) {
    const q = {
      text: `SELECT playlists.id, playlists.name, users.username from playlists
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.owner = $1`,
      values: [owner],
    };
    const result = await pool.query(q);
    return result.rows;
  }
  async getPlaylist(id) {
    console.log(id);
    const q = {
      text: `SELECT playlists.id, playlists.name, users.username FROM playlists
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.id = $1`,
      values: [id],
    };
    const res = await pool.query(q);
    if (!res.rows.length) throw new NotFoundError('Playlist not found.');
    return res.rows[0];
  }
  async deletePlaylist(id) {
    const q = {
      text: 'DELETE FROM playlists WHERE playlists.id = $1 RETURNING id',
      values: [id]
    };
    const res = await pool.query(q);
    if (!res.rows.length) throw new NotFoundError('Delete failed: invalid id');
  }
  async verifyPlaylistOwner(id, owner) {
    const q = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id]
    };
    const res = await pool.query(q);
    console.log(id, owner);
    console.log(res.rows);
    console.log(res.rowCount);
    if (res.rows.length === 0) throw new NotFoundError('Playlist not found.');
    const playlist = res.rows[0];
    if (playlist.owner !== owner) throw new AuthorizationError('You are not authorized to access the playlist');
  }
}
module.exports = PlaylistsService;