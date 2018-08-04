import {Server} from 'hapi';

const configureRoutes = (server: Server) => {
  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: './public',
        redirectToSlash: true,
        index: true,
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => h.view('index', {
      jsBundle: process.env.NODE_ENV !== 'development' ? '/public/app.js' : 'http://localhost:1234/app.js'
    })
  });
};

export default configureRoutes;
