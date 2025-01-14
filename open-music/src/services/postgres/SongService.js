import { Pool } from 'pg';
import nanoid from 'nanoid';

class SongService {
  constructor() {
    this._pool = new Pool();
  }
  async getAllSongs() {

  }

  async getSong(id) {

  }

  async addSong({ title, year, performer, genre, duration, albumId }){

  }

  async updateSong({ id }) {

  }

  async deleteSong({ id }) {

  }
}