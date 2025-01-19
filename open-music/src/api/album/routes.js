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
  }
];
module.exports =  routes;