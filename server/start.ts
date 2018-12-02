/// <reference path="./types/index.d.ts" />
import 'reflect-metadata';
import { Server } from 'hapi';
import * as Vision from 'vision';
import * as Inert from 'inert';
import * as yar from 'yar';
import * as hapiAuthAuth0 from 'hapi-auth-auth0';
import { success, transformer, error } from './auth';
import config from './config';
import logger from './logging/logger';
import configureRoutes from './routes/configure-routes';

const server = new Server({
  port: process.env.PORT || 5000
});

const start = async () => {
  try {
    // yar needs to be registered before hapiAuthAuth0
    await server.register({
      plugin: yar,
      options: {
        storeBlank: false,
        cookieOptions: {
          // TODO:
          password: 'b10ccbe4-cfd8-4ff0-9bf6-7e6fc602b7ea',
          isSecure: process.env.NODE_ENV !== 'development'
        }
      }
    });

    await server.register({
      plugin: hapiAuthAuth0,
      options: {
        domain: process.env.AUTH0_DOMAIN,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        success,
        transformer,
        error
      }
    });
    server.auth.strategy('auth0', 'auth0');

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
      isCached: config.get('env') === 'production'
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
