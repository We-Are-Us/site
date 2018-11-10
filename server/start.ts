/// <reference path="./types/index.d.ts" />
import 'reflect-metadata';
import { Server, ResponseToolkit } from 'hapi';
import * as Vision from 'vision';
import * as Inert from 'inert';
import * as hapiAuthAuth0 from 'hapi-auth-auth0';
import config from './config';
import logger from './logging/logger';
import configureRoutes from './routes/configure-routes';

interface Credentials {
  sub: string;
  cn: string;
  scope?: string;
}

const server = new Server({
  port: process.env.PORT || 5000
});

const start = async () => {
  try {
    await server.register({
      plugin: hapiAuthAuth0,
      options: {
        // TODO: move to config
        domain: process.env.AUTH0_DOMAIN,
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        success: async (
          credentials: any,
          request: Request,
          h: ResponseToolkit
        ) => {
          logger.debug('success: %O', credentials);
        },
        transformer: async (credentials: Credentials) => {
          const email = credentials.sub.split('|').slice(-1)[0];

          credentials.cn = email.substr(0, email.indexOf('@'));
          // TODO: lookup user in db and workout role
          // also if no user what do we do?
          credentials.scope = 'user';

          return credentials;
        },
        // optional
        error: async (err: Error, request: Request, h: ResponseToolkit) => {
          logger.error(err.message);

          const response = h.response(
            '<h1>Oh hey, sorry, something went wrong.</h1>'
          );

          return response.takeover();
        }
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
