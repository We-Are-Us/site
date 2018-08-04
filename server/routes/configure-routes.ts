import {Server} from 'hapi';
import {Entry} from 'contentful';
import contentfulClient from '../content/client';
import getCategories from '../content/get-categories';

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
    handler: (request, h) => h.view('index', {
      jsBundle: process.env.NODE_ENV !== 'development' ? '/public/app.js' : 'http://localhost:1234/app.js'
    })
  });

  server.route({
    method: 'GET',
    path: '/api/content/entries',
    handler: async (request, h) => {
      const client = contentfulClient;
      const entries = await getCategories(client);

      return entries.map((entry: Entry<any>) => ({
        name: entry.fields.name,
        image: entry.fields.image.fields.file.url
      }));
    }
  })
};

export default configureRoutes;
