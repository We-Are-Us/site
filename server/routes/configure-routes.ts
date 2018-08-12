import {Server, ResponseObject} from 'hapi';
import {Entry} from 'contentful';
import contentfulClient from '../content/client';
import getCategories from '../content/get-categories';

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
    handler: async (request, h) => {
      // TODO: this should go in a separate module so it can be cached, reused, etc.
      const client = contentfulClient;
      const entries = await getCategories(client);

      const mappedEntries = entries.map((entry: Entry<any>) => ({
        name: entry.fields.name,
        image: entry.fields.image.fields.file.url
      }));

      const i = Math.floor(Math.random() * mappedEntries.length);
      const modality = mappedEntries[i];

      return h
        .view('index', {
          appInsightsKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
          gtmContainerId: process.env.GTM_CONTAINER_ID,
          jsBundle: process.env.NODE_ENV !== 'development' ? '/public/app.js' : 'http://localhost:1234/app.js',
          initialState: JSON.stringify({modality})
        })
        .header('Accept-CH', 'DPR, Viewport-Width, Width')
        .header('link', `<${modality.image}>; rel=prefetch`);
    }
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
