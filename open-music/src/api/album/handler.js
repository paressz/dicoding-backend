
class AlbumHandler {
  constructor(service, validator, storageService, uploadValidator) {
    this._service = service;
    this._validator = validator;
    this._storageService = storageService;
    this._uploadValidator = uploadValidator;
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
  async getAlbumByIdHandler(req) {
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
  async insertAlbumCoverHandler(r, h) {
    const { id } = r.params;
    const { cover } = r.payload;
    await this._uploadValidator.validateImageHeader(cover.hapi.headers);
    const fileName = await this._storageService.writeFile(cover, cover.hapi);
    const filePath = `http://${process.env.HOST}:${process.env.PORT}/uploads/covers/${fileName}`;
    await this._service.insertAlbumCover(id, filePath);
    return h.response({ status: 'success', message: 'Cover uploaded!' }).code(201);
  }
  async addLikeToAlbumHandler(r, h) {
    const { id } = r.params;
    const { id: credentialId } = r.auth.credentials;
    const albLikeId = await this._service.addLikeToAlbum(id, credentialId);
    return h.response({
      status: 'success',
      message: `+1 Like to ${albLikeId}!`,
    }).code(201);
  }
  async getLikeFromAlbumHandler(req, h) {
    const { id } = req.params;
    const { likes, source } = await this._service.getLikeFromAlbum(id);
    const response = h
      .response({
        status: 'success',
        data: { likes }
      })
      .headers('X-Data-Source', source);
    return response;
  }
  async removeLikeFromAlbumHandler(req, h) {
    const { id } = req.params;
    const { id: credentialId } = req.auth.credentials;
    const albLikeId = await this._service.removeLikeFromAlbum(id, credentialId);
    return h.response({
      status: 'success',
      message: `-1 like from ${albLikeId}!`,
    });
  }
}

module.exports =  AlbumHandler;