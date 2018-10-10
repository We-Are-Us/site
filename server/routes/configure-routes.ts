import { Server, Request, Lifecycle } from 'hapi';
import { Entry } from 'contentful';
import { Marked } from 'marked-ts';
import logger from '../logging/logger';
import config from '../config';
import contentfulClient from '../content/client';
import getCategories from '../content/get-categories';
import getText from '../content/get-text';
import getTitledText from '../content/get-titled-text';
import { headerLinks } from '../features/header-links';
import { footerLinks } from '../features/footer-links';

const EXPIRES_IN_SECONDS = 7200;

const getViewContext = (request: Request) => ({
  appInsightsKey: config.get('appInsights.instrumentationKey'),
  gtmContainerId: config.get('gtm.containerId'),
  jsBundle:
    config.get('env') === 'production'
      ? '/public/app.js'
      : 'http://localhost:1234/app.js',
  navigationTextColor: request.url.pathname === '/' ? 'white' : 'primary',
  navigationOutlineColor: request.url.pathname === '/' ? 'light' : 'primary',
  headerLinks,
  footerLinks
});

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
    .view(
      'index',
      Object.assign(
        {
          lead: Marked.parse(lead)
        },
        getViewContext(request)
      )
    )
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

  server.route({
    method: 'GET',
    path: '/',
    handler
  });

  server.route({
    method: 'GET',
    path: '/practitioners/{name}',
    handler: (request, h) => {
      // TODO: look up
      const modalities = ['Reflexology', 'Reki'];
      const heroImage = '/public/assets/profile_header_1.jpg';
      const practiceName = 'Walk In Light';
      const location = 'Albany, Auckland';

      return h.view(
        'practitioner',
        Object.assign(
          { modalities, heroImage, practiceName, location },
          getViewContext(request)
        )
      );
    }
  });
  // ['/', '/practicioner'].forEach(path => {
  // });

  server.route({
    method: 'GET',
    path: '/register',
    handler: (request, h) => {
      // TODO: put in features from contentful
      return h.view('register', getViewContext(request));
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
  });
};

export default configureRoutes;
