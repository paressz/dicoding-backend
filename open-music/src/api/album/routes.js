const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: (r, h) => handler.addAlbumHandler(r, h)
  },
  {
    method: 'GET',
    path: '/albums',
    handler: (r, h) => handler.getAllAlbumsHandler(r, h)
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: (r) => handler.getAlbumByIdHandler(r)
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: (r) => handler.updateAlbumHandler(r)
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: (r) => handler.deleteAlbumHandler(r)
  },
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: (r, h) => handler.insertAlbumCoverHandler(r, h),
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/covers/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file/covers'),
      }
    },
    options: { auth: 'openmusic-jwt' }
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    handler: (r, h) => handler.getLikeFromAlbumHandler(r, h),
  },
  {
    method: 'DELETE',
    path: '/albums/{id}/likes',
    handler: (r, h) => handler.removeLikeFromAlbumHandler(r, h),
    options: { auth: 'openmusic-jwt' }
  }

];
module.exports =  routes;