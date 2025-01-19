const routes = (handler) => [
  {
    method: 'GET',
    path: '/songs',
    handler: (r, h) => handler.getAllSongs(r, h),
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: (r, h) => handler.getSong(r, h),
  },
  {
    method: 'POST',
    path: '/songs',
    handler: (r, h) => handler.insertSong(r, h),
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: (r) => handler.updateSong(r),
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: (r) => handler.deleteSong(r),
  },

];
module.exports = routes;