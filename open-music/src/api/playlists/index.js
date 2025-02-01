const routes = require('./routes');
const PlaylistsHandler = require('./handler');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { playlistsService, playlistsSongsService, validator }) => {
    const playlistsHandler = new PlaylistsHandler(playlistsService, playlistsSongsService, validator);
    server.route(routes(playlistsHandler));
  },
};