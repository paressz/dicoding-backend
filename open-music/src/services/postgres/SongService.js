const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const pool = require('./pool');
const Song = require('../../model/Song');

class SongService {
  constructor() {
    this._pool = pool;
  }
  async getAllSongs({ title, performer }) {
    const queryResult = await this._pool.query('SELECT * FROM songs');
    let songs = queryResult.rows;
    if (title) {
      songs = songs.filter((s) => s.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (performer) {
      songs = songs.filter((s) => s.performer.toLowerCase().includes(performer.toLowerCase()));
    }
    return songs.map(Song);
  }

  async getSong(id) {
    const q = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(q);
    const song = result.rows[0];
    if (!result.rows.length) throw new NotFoundError('No such song found');
    return song;
  }

  async addSong({ title, year, performer, genre, duration, albumId }){
    const id = `song-${nanoid(16)}`;
    const q = {
      text: 'INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId],
    };
    const result = await this._pool.query(q);
    if (!result) throw new InvariantError('Failed to insert song');
    return result.rows[0].id;
  }

  async updateSong(id, { title, year, performer, genre, duration, albumId }) {
    const q  = {
      text: 'UPDATE songs SET title = $2, year = $3, performer = $4, genre = $5, duration = $6, album_id = $7 WHERE id = $1 RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId],
    };
    const result = await this._pool.query(q);
    if (!result.rows.length) throw new NotFoundError('Failed: No such song');
  }

  async deleteSong(id) {
    const q = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(q);
    if (!result.rows.length) throw new NotFoundError(`Failed: No such song ${id}`);
  }
}

module.exports =  SongService;