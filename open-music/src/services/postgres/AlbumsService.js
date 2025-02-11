const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const Album =  require('../../model/Album');
const NotFoundError = require('../../exceptions/NotFoundError');
const pool = require('./pool');
const SongSimple = require('../../model/Song');
const res = require('pg/lib/query');

class AlbumsService {
  constructor(cacheService) {
    this._pool = pool;
    this._cacheService = cacheService;
  };

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO albums VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, name, year, null],
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
        coverUrl: album.cover,
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

  async insertAlbumCover(albumId, coverUrl) {
    const query = {
      text: 'UPDATE albums SET cover = $1 WHERE id = $2 returning id',
      values: [coverUrl, albumId],
    };
    return (await this._pool.query(query));
  }

  async addLikeToAlbum(albumId, userId) {
    const id = `album-likes-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO album_likes VALUES ($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };
    const res = await this._pool.query(query);
    const albLikeId = res.rows[0].id;
    if (!res.rows.length) throw new NotFoundError(`Invalid userId ${userId} or albumId ${albumId}`);
    await this._cacheService.delete(`cachedAlbumLikes-${albumId}`);
    return albLikeId;
  }

  async getLikeFromAlbum(id) {
    try {
      const cachedAlbumLikes = await this._cacheService.get(`cachedAlbumLikes-${id}`);
      return { likes: +cachedAlbumLikes, source: 'cache' };
    } catch (e) {
      const query = {
        text: 'SELECT COUNT(*) FROM album_likes WHERE album_id = $1',
        values: [id],
      };
      const res = await this._pool.query(query);
      console.log(`like count: ${res.rows[0].count}`);
      await this._cacheService.set(`cachedAlbumLikes-${id}`, res.rows[0].count);
      return { likes: res.rows[0].count, source: 'database'};
    }
  }

  async removeLikeFromAlbum(albumId, userId) {
    const albumLikeIdQuery = {
      text: 'SELECT id FROM album_likes WHERE user_id = $1 AND album_id = $2',
      values: [albumId, userId],
    };
    const idQuery = await this._pool.query(albumLikeIdQuery);
    if (!idQuery.rows.length) throw new NotFoundError(`Invalid userId ${userId} or albumId ${albumId}`);
    const albLikeId = res.rows[0].id;
    const removeLikeQuery = {
      text: 'DELETE FROM album_likes WHERE id = $1 returning id',
      values: [albLikeId],
    };
    await this._pool.query(removeLikeQuery);
    await this._cacheService.delete(`cachedAlbumLikes-${albumId}`);
    return albLikeId;
  }
}


module.exports = AlbumsService;