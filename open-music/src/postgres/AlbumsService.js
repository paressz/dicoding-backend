const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');
const Album =  require('../model/Album');
const NotFoundError = require('../exceptions/NotFoundError');
const config = require('./config');
const SongSimple = require('../model/Song');

class AlbumsService {
  constructor() {
    this._pool = new Pool(config);
  };
  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO albums VALUES ($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };
    const result = await this._pool.query(query);
    const albumId = result.rows[0].id;
    if (!albumId) {
      throw new InvariantError('Failed to insert album');
    }
    return albumId;
  }
  async getAllAlbum() {
    const albums = await this._pool.query('SELECT * FROM albums');
    return albums.rows.map(Album);
  }
  async getAlbum({ id }) {
    const albumQuery = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const albumResult = await this._pool.query(albumQuery);
    if (!albumResult.rows.length) throw new NotFoundError('Get failed: No such album');
    const album = albumResult.rows[0];
    //console.log(album);
    const songQuery = {
      text: 'SELECT * FROM songs WHERE album_id = $1',
      values: [id],
    };
    const songResult = await this._pool.query(songQuery);
    console.log(songResult.rows);
    const songs = songResult.rows.map(SongSimple);
    const result = {
      album: {
        id: album.id,
        name: album.name,
        year: album.year,
        songs: songs
      }
    };
    return result;
  }
  async updateAlbum(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) throw new NotFoundError('Update Failed: No such album');
  }

  async deleteAlbum({ id }) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) throw new NotFoundError(`Delete Failed: No such album ${id}`);
  }
}

module.exports = AlbumsService;