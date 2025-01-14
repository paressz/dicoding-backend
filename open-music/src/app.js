const hapi = require('@hapi/hapi');
require('dotenv').config();

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
  await server.start();
  console.log(`Server started on port: ${server.info.port}`);
};

init();