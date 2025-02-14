const AlbumHandler = require('./handler');
const routes = require('./routes');
module.exports = {
  name: 'albums',
  version: '1.0',
  register: async (server, { service, validator, storageService, uploadsValidator }) => {
    const albumHandler = new AlbumHandler(service, validator, storageService, uploadsValidator);
    server.route(routes(albumHandler));
  }
};