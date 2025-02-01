const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: (r, h) => handler.addPlaylistHandler(r, h),
    options: { auth: 'openmusic-jwt' }
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: (r) => handler.getPlaylistsHandler(r),
    options: { auth: 'openmusic-jwt' }
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}',
    handler: (r) => handler.deletePlaylistHandler(r),
    options: { auth: 'openmusic-jwt' }
  },
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: (r, h) => handler.addSongsToPlaylistHandler(r, h),
    options: { auth: 'openmusic-jwt' }
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: (r) => handler.getSongFromPlaylistHandler(r),
    options: { auth: 'openmusic-jwt' }
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: (r) => handler.deletSongFromPlaylistHandler(r),
    options: { auth: 'openmusic-jwt' }
  }
];
module.exports = routes;