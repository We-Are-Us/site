import {Server} from 'hapi';
import logger from './logging/logger';

const server = new Server({
  host: 'localhost',
  port: 8080
});

server.route({
  method:'GET',
  path:'/hello',
  handler: (request, h) => 'hello world'
});

const start = async () => {
  try {
    server.start();
  } catch (e) {
    logger.log('error', 'Server failed to start.', e);
    process.exit(1);
  }

  logger.log('info', `Server running on ${server.info.port}.`);
};

start();
