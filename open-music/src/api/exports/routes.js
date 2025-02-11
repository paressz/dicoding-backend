const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: (r, h) => handler.postToExportPlaylistsHandler(r, h),
    options: { auth: 'openmusic-jwt', },
  },
];
module.exports = routes;