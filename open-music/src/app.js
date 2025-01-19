const hapi = require('@hapi/hapi');
require('dotenv').config();

const albums = require('./api/album');
const AlbumService = require('./postgres/AlbumsService');
const AlbumValidator = require('./validator/album/AlbumValidator');
const ClientError = require('./exceptions/ClientError');
const songs = require('./api/song');
const SongService = require('./postgres/SongService');
const SongValidator = require('./validator/song/SongValidator');
const init = async () => {
  const server = hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      }
    }
  });
  await server.register([
    {
      plugin: albums,
      options: {
        service: new AlbumService(),
        validator: AlbumValidator
      }
    },
    {
      plugin: songs,
      options: {
        service: new SongService(),
        validator: SongValidator
      }
    }
  ]);
  server.ext('onPreResponse', (req, h) => {
    const { response } = req;
    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newRes = h.response({
          status: 'fail',
          message: response.message,
        });
        newRes.code(response.statusCode);
        console.error(response);
        return newRes;
      }
      if (!response.isServer) return h.continue;
      console.log(response);
      const newRes = h.response({
        status: 'error',
        message: 'Server Error',
      }).code(500);
      return newRes;
    }
    return h.continue;
  });
  await server.start();
  console.log(`Server started:\n${server.info.host}:${server.info.port}`);
};

init();