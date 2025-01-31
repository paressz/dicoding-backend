const { nanoid } = require('nanoid');
const pool = require('pool');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

class PlaylistsService {
  async addPlaylist({name, owner}) {
    const id = `playlist-${nanoid(16)}`;
    const q = {
      text: 'INSERT INTO playlists VALUES ($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };
    const result = await pool.query(q);
    if(!result.rows.length) throw new InvariantError();
    return result.rows[0].id;
  }
  async getPlaylists(owner) {
    const q = {
      text: `
      SELECT playlists.id, playlists.name, users.username
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.owner = $1'
      `,
      values: [owner],
    };
    const result = await pool.query(q);
    return result.rows;
  }
  async getPlaylist(id) {
    const q = {
      text: `
      SELECT playlists.id, playlists.name, users.username
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.owner = $1'
      `,
      values: [id],
    };
    const res = await pool.query(q);
    if(!res.rows.length) throw new NotFoundError('Playlist not found.');
    return res.rows[0];
  }
  async deletePlaylist(id) {
    const q = {
      text: 'DELETE FROM playlists WHERE playlists.id = $1 RETURNING id',
      values: [id]
    };
    const res = await pool.query(q);
    if(!res.rows.length) throw new NotFoundError('Delete failed: invalid id');
  }
}
module.exports = PlaylistsService;