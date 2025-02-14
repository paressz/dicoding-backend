const hapi = require('@hapi/hapi');
require('dotenv').config();
const jwt = require('@hapi/jwt');
const inert = require('@hapi/inert');
const path = require('path');

const albums = require('./api/albums');
const AlbumService = require('./services/postgres/AlbumsService');
const AlbumValidator = require('./validator/album/AlbumValidator');


const songs = require('./api/song');
const SongService = require('./services/postgres/SongService');
const SongValidator = require('./validator/song/SongValidator');

const users = require('./api/users');
const UserService = require('./services/postgres/UserService');
const UserValidator = require('./validator/users/UserValidator');

const authentication = require('./api/authentications');
const AuthenticationService = require('./services/postgres/AuthenticationService');
const AuthenticationValidator = require('./validator/authentications/AuthenticationValidator');

const playlists = require('./api/playlists');
const PlaylistsService = require('./services/postgres/PlaylistsService');
const playlistsValidator = require('./validator/playlists/PlaylistsValidator');
const PlaylistsSongsService = require('./services/postgres/PlaylistSongsService');

const _exports = require('./api/exports');
const ProducerService = require('./services/rmq/ProducerService');
const ExportsValidator = require('./validator/exports');

const StorageService = require('./services/storage/StorageService');
const UploadsValidator = require('./validator/uploads');
const CacheService = require('./services/redis/CacheService');

const TokenManager = require('./tokenize/TokenManager');
const ClientError = require('./exceptions/ClientError');

const init = async () => {
  const songsService = new SongService();
  const usersService = new UserService();
  const authenticationsService = new AuthenticationService();
  const playlistsService = new PlaylistsService();
  const playlistsSongsService = new PlaylistsSongsService(songsService);
  const cacheService = new CacheService();
  const storePath = path.resolve(__dirname, 'api/albums/file/covers');
  console.log(`a: ${  storePath}`);
  const storageService = new StorageService(storePath);

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
      plugin: jwt
    },
    {
      plugin: inert
    }
  ]);

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
        service: new AlbumService(cacheService),
        validator: AlbumValidator,
        storageService,
        uploadsValidator: UploadsValidator
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
    {
      plugin: _exports,
      options: {
        producerService: ProducerService,
        playlistsService,
        exportsValidator: ExportsValidator
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
