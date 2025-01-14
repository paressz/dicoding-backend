import { Pool } from 'pg';
import nanoid from 'nanoid';

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  };
  async addAlbum({ name, year }) {

  }
  async getAllAlbum() {

  }
  async getAlbum({ id }) {

  }
  async updateAlbum({ id }) {

  }
  async deleteAlbum({ id }) {

  }
}

export default AlbumsService;