
class AlbumHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }
  async addAlbumHandler(req, han) {
    this._validator.validateAlbumPayload(req.payload);
    const albumId = await this._service.addAlbum(req.payload);
    const res = han.response({
      status: 'success',
      data: {
        albumId: albumId,
      }
    }).code(201);
    return res;
  }
  async getAllAlbumsHandler(req, h) {
    const albums = await this._service.getAllAlbum();
    const res = h.response({
      status: 'success',
      albums: albums
    });
    res.code(200);
    return res;
  }
  async getAlbumByIdHandler(req, h) {
    const { id } = req.params;
    const album = await this._service.getAlbum(req.params);
    return {
      status: 'success',
      data: album
    };
  }
  async updateAlbumHandler(req) {
    this._validator.validateAlbumPayload(req.payload);
    const { id } = req.params;
    await this._service.updateAlbum(id, req.payload);
    return {
      status: 'success',
      message: 'Album updated'
    };
  }
  async deleteAlbumHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbum(request.params);
    return {
      status: 'success',
      message: `${id} deleted`,
    };
  }
}

module.exports =  AlbumHandler;