import {Server} from 'hapi';
import * as Vision from 'vision';
import * as Inert from 'inert';
import logger from './logging/logger';
import configureRoutes from './routes/configure-routes';

const DEFAULT_PORT = 8080;

const server = new Server({
  port: process.env.PORT || DEFAULT_PORT
});

const start = async () => {
  try {
    await server.register(Vision);

    server.views({
      engines: {
        hbs: require('handlebars')
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views/layout',
      partialsPath: 'views/partials',
      isCached: process.env.NODE_ENV !== 'development'
    });

    await server.register(Inert);

    configureRoutes(server);

    await server.start();
  } catch (e) {
    logger.log('error', 'Server failed to start. ' + e.message);
    process.exit(1);
  }

  logger.log('info', `Server running on ${server.info.port}.`);
};

start();
