require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

class Service {
  async getPlaylist(plId) {
    const plQuery = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [plId],
    };
    const songQuery = {
      text: `SELECT song.id, song.title, song.performer FROM songs song
      JOIN playlist_songs playlist ON song.id = playlist.song_id
      WHERE playlist.playlist_id = $1`,
      values: [plId],
    };
    const plResult = await pool.query(plQuery);
    const songResult = await pool.query(songQuery);
    return {
      playlist: {
        ...plResult.rows[0],
        songs: songResult.rows
      }
    };
  }
}

module.exports = Service;