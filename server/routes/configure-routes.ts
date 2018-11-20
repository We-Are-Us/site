import { Server, ServerRoute } from 'hapi';
import logger from '../logging/logger';
import handler from './handler';
import apiRoutes from './api';
import chargeRoutes from './charge';
import practitionerRoutes from './practitioners';
import registerRoutes from './register';
import registrationRoutes from './registration';
import getViewContext from './getViewContext';

const EXPIRES_IN_SECONDS = 7200;

const configureRoutes = (server: Server) => {
  server.route({
    method: 'GET',
    path: '/public/{param*}',
    options: {
      cache: {
        expiresIn: EXPIRES_IN_SECONDS,
        privacy: 'public'
      }
    },
    handler: {
      directory: {
        path: './public',
        redirectToSlash: true,
        index: true,
        etagMethod: 'simple'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler
  });

  server.route({
    method: 'GET',
    path: '/view/{name}',
    handler: (request, h) => {
      if (process.env.NODE_ENV !== 'development') {
        throw new Error('/view/* is only supported in development mode');
      }

      const name = request.params.name;

      return h.view(name, getViewContext(request));
    }
  });

  server.route({
    method: 'GET',
    path: '/secure',
    options: {
      auth: {
        strategy: 'auth0',
        scope: ['user', 'admin']
      }
    },
    handler: async (request, h) => {
      logger.debug('request.headers: %O', request.headers);
      logger.debug('request.auth: %O', request.auth);

      return 'ok';
    }
  });

  const initRoute = (route: ServerRoute) => server.route(route);

  apiRoutes.forEach(initRoute);
  chargeRoutes.forEach(initRoute);
  practitionerRoutes.forEach(initRoute);
  registerRoutes.forEach(initRoute);
  registrationRoutes.forEach(initRoute);
};

export default configureRoutes;
