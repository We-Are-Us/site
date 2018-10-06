import { Server, Lifecycle } from 'hapi';
import { Entry } from 'contentful';
import config from '../config';
import contentfulClient from '../content/client';
import getCategories from '../content/get-categories';
import getText from '../content/get-text';
import getTitledText from '../content/get-titled-text';

const EXPIRES_IN_SECONDS = 7200;

const handler: Lifecycle.Method = async (request, h) => {
  // TODO: this should go in a separate module so it can be cached, reused, etc.
  const client = contentfulClient;

  const promises = await Promise.all([
    getCategories(client),
    getText(client, 'lead'),
    getTitledText(client, 'benefit-1'),
    getTitledText(client, 'benefit-2')
  ]);

  const entries = promises[0];
  const lead = promises[1];
  const benefits = [promises[2], promises[3]];

  const categories = entries.map((entry: Entry<any>) => ({
    name: entry.fields.name,
    image: entry.fields.image.fields.file.url
  }));

  const i = Math.floor(Math.random() * categories.length);
  const modality = categories[i];

  return h
    .view('index', {
      appInsightsKey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY,
      gtmContainerId: process.env.GTM_CONTAINER_ID,
      jsBundle:
        config.get('env') === 'production'
          ? '/public/app.js'
          : 'http://localhost:1234/app.js',
      initialState: JSON.stringify({ benefits, categories, lead, modality })
    })
    .header('Accept-CH', 'DPR, Viewport-Width, Width')
    .header('link', `<${modality.image}>; rel=prefetch`);
};

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

  ['/', '/practicioner'].forEach(path => {
    server.route({
      method: 'GET',
      path,
      handler
    });
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
  });
};

export default configureRoutes;
