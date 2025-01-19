const AlbumHandler = require('./handler');
const routes = require('./routes');
module.exports = {
  name: 'albums',
  version: '1.0',
  register: async (server, { service, validator }) => {
    const albumHandler = new AlbumHandler(service, validator);
    server.route(routes(albumHandler));
  }
};