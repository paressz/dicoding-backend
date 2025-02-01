const hapi = require('@hapi/hapi');
require('dotenv').config();
const jwt = require('@hapi/jwt');

const albums = require('./api/album');
const AlbumService = require('./postgres/AlbumsService');
const AlbumValidator = require('./validator/album/AlbumValidator');


const songs = require('./api/song');
const SongService = require('./postgres/SongService');
const SongValidator = require('./validator/song/SongValidator');

const users = require('./api/users');
const UserService = require('./postgres/UserService');
const UserValidator = require('./validator/users/UserValidator');

const authentication = require('./api/authentications');
const AuthenticationService = require('./postgres/AuthenticationService');
const AuthenticationValidator = require('./validator/authentications/AuthenticationValidator');

const playlists = require('./api/playlists');
const PlaylistsService = require('./postgres/PlaylistsService');
const playlistsValidator = require('./validator/playlists/PlaylistsValidator');
const PlaylistsSongsService = require('./postgres/PlaylistSongsService');

const TokenManager = require('./tokenize/TokenManager');
const ClientError = require('./exceptions/ClientError');

const init = async () => {
  const songsService = new SongService();
  const usersService = new UserService();
  const authenticationsService = new AuthenticationService();
  const playlistsService = new PlaylistsService();
  const playlistsSongsService = new PlaylistsSongsService(songsService);

  const server = hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      }
    }
  });
  await server.register({ plugin: jwt });
  server.auth.strategy('openmusic-jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 9000
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: { id: artifacts.decoded.payload.id }
    })
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
        service: songsService,
        validator: SongValidator
      }
    },
    {
      plugin: authentication,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationValidator
      }
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UserValidator
      }
    },
    {
      plugin: playlists,
      options: {
        playlistsService,
        playlistsSongsService,
        validator: playlistsValidator
      }
    },
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